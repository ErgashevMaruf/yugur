import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AnimationOptions } from 'ngx-lottie';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
    constructor(private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data:string,
        ) {}
    options: AnimationOptions = {
        path: './assets/actions/Error.json',
    };
    errorMessage = 'something.went.wrong'
    ngOnInit() {
        if(this.data)
        {
            this.errorMessage = this.data
        }
    }

    close() {
        this.dialog.closeAll();
    }
}
