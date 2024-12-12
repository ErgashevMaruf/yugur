import {
    Directive,
    HostBinding,
    HostListener,
    Output,
    EventEmitter
  } from "@angular/core";
  import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

  export interface FileHandle {
    file: File,
    url: SafeUrl
  }

  @Directive({
    selector: "[appDrag]",
    standalone: true
  })
  export class DragDirective {
    @Output() files: EventEmitter<File[]> = new EventEmitter();

    @HostBinding("style.background") private background = "transparent";

    constructor(private sanitizer: DomSanitizer) { }

    @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = "#eee";
    }

    @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = "transparent";
    }

    @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = 'transparent';

      let files: File[] = [];
      for (let i = 0; i < evt.dataTransfer.files.length; i++) {
        const file = evt.dataTransfer.files[i];
        const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
        files.push(file);
      }
      if (files.length > 0) {
        this.files.emit(files);
      }
    }
  }
