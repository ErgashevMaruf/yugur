import { Directive, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2 } from '@angular/core';
import { debounceTime, fromEvent, interval, throttleTime } from 'rxjs';

@Directive({
    selector: '[appScrollWithMouse]',
    standalone: true,
})
export class ScrollWithMouseDirective {
    @Output() scrollSignalNumber = new EventEmitter<number>();
    y=1;
    position = 0;
    i=1;
    constructor(private renderer: Renderer2, private el: ElementRef) {}
    @HostListener('mousewheel', ['$event']) onMousewheel(event:WheelEvent) {
        event.preventDefault();
        // this.position = event.wheelDelta < 0?this.position+44:this.position-44;
        // this.renderer.setStyle(this.el.nativeElement, 'transform', `translateY(${this.position}px)`);
        this.scrollSignalNumber.emit(event.deltaY)
    }
}
