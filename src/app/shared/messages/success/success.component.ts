import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AnimationOptions } from 'ngx-lottie';

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private matdialogRef: MatDialogRef<SuccessComponent>,
        @Inject(MAT_DIALOG_DATA) public message:string
    ) {}
    textMessage = 'success'
    options: AnimationOptions = {
        path: './assets/actions/Success.json',
    };
    ngOnInit() {
        if(this.message)
        {
            this.textMessage = this.message
        }
        setTimeout(() => {
            this.matdialogRef.close();
        }, 3000);
    }
    close() {
        this.matdialogRef.close();
    }
}
