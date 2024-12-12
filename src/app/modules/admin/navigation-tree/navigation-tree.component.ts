import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-navigation-tree',
    templateUrl: './navigation-tree.component.html',
    styleUrls: ['./navigation-tree.component.css'],
})
export class NavigationTreeComponent implements OnInit {
    @ViewChild('list') public list;
    constructor() {}

    ngOnInit() {}
}
