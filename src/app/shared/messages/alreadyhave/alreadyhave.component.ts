import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-alreadyhave',
    templateUrl: './alreadyhave.component.html',
    styleUrls: ['./alreadyhave.component.css'],
})
export class AlreadyhaveComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

    ngOnInit() {}
}
