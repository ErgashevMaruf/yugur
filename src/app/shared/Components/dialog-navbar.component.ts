import { FormControl, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    OnDestroy,
} from '@angular/core';

@Component({
    selector: 'dialog-navbar',
    template: `
        <div *transloco="let t" class="dialog-content-wrapper w-full">
          <div class="flex justify-between">
            <div class="px-[30px] rounded-[10px] bg-[#0098da] flex items-center justify-center
            text-white font-semibold text-[16px]
            ">
              <span class="title dialog-title max-w-40">{{
                titleDialog
              }}</span>
            </div>
            <button
              mat-icon-button
              (click)="matDialogRef.close()"
              aria-label="Close dialog"
              >
              <mat-icon class="text-current">close</mat-icon>
            </button>
          </div>
          <ng-content></ng-content>
          @if (isDialogActions) {
            <div
              mat-dialog-actions
              class="mx-5 my-2 flex justify-between gap-3"
              >
              <button mat-raised-button (click)="matDialogRef.close()">
                {{ t('config.close') }}
              </button>
              @if (showDeleteBtn) {
                <button
                  [disabled]="modelId == undefined || modelId == 0"
                  pButton
                  pRipple
                  type="button"
                  class="save-button p-button-rounded p-button-warning"
                  (click)="onDelete.emit()"
                  >
                  {{ t('config.delete') }}
                </button>
              }
              @if (hidden) {
                <button
                  mat-flat-button
                  [color]="'primary'"
                  (click)="onClick.emit()"
                  [disabled]="!heroForm.form.valid"
                  class="save-button"
                  >
                  <span class="ml-2">{{
                    modelId == undefined || modelId == 0
                    ? t('config.add')
                    : t('config.save')
                  }}</span>
                </button>
              }
            </div>
          }
        </div>
        `,
})
export class DialogNavbarComponent implements OnInit, OnDestroy {
    dialogRef: any;
    @Input() hidden: boolean = true;
    @Input() titleDialog: string;
    @Input() matDialogRef: MatDialogRef<any>;
    @Input() heroForm: NgForm;
    @Input() modelId: number = 0;
    @Input() showDeleteBtn: false;
    @Input() isDialogActions: boolean = true;

    @Output() onClick = new EventEmitter<void>();
    @Output() onDelete = new EventEmitter<void>();

    constructor() {}
    ngOnDestroy(): void {
        this.onClick.complete();
        this.onDelete.complete();
    }

    ngOnInit() {}
}
