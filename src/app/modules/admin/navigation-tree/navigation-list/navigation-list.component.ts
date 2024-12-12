import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationClient, NavigationDTO } from 'nswag-api/nswag-api-auth';

@Component({
    selector: 'app-navigation-list',
    templateUrl: './navigation-list.component.html',
    styleUrls: ['./navigation-list.component.css'],
})
export class NavigationListComponent implements OnInit {
    @Output() onRowSelectDialog = new EventEmitter<number>();
    cols: any[];
    navigationItems: any[] = [];
    selItem: any;
    constructor(private navigationClient: NavigationClient) {}

    ngOnInit() {
        this.cols = [
            { field: 'title', header: 'navigation.title' },
            { field: 'link', header: 'navigation.link' },
            { field: 'key', header: 'user.roles' },
        ];
        this.onloadLazy();
    }
    onloadLazy() {
        this.navigationClient.getNavigationsTreeTable().subscribe((x) => {
            this.navigationItems = x;
        });
    }
}
