import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.css'],
})
export class LeftMenuComponent implements OnInit {
    constructor() {}
    @Input() textMenu: string;
    @Input() selectedMenuItem: boolean;
    @Input() notActive: boolean;
    @Input() icon: string;
    @Output() clickDone: EventEmitter<boolean> = new EventEmitter<boolean>();
    ngOnInit() {}
}
