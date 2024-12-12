import { Component, Inject, OnInit } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';

@Component({
    selector: 'app-warning',
    templateUrl: './warning.component.html',
    styleUrls: ['./warning.component.scss'],
})
export class WarningComponent implements OnInit {
    constructor(
        private dialog: MatDialogRef<WarningComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) {}
    text = 'you.really.want.delete';
    ngOnInit() {
        if (this.data) {
            this.text = this.data;
        }
    }
    closeDialog() {
        this.dialog.close('no');
    }
    confirmDialog() {
        this.dialog.close('yes');
    }
}
