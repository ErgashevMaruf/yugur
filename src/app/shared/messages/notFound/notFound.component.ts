import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnimationOptions } from 'ngx-lottie';

@Component({
    selector: 'app-notFound',
    templateUrl: './notFound.component.html',
    styleUrls: ['./notFound.component.css'],
})
export class NotFoundComponent implements OnInit {
    constructor(private dialog: MatDialog) {}
    options: AnimationOptions = {
        path: './assets/actions/Yugur.json',
    };
    ngOnInit() {}
    close() {
        this.dialog.closeAll();
    }
}
