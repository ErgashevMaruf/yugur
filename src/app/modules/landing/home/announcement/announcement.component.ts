import { Component, OnInit } from '@angular/core';
import { NewsClient, NewsDTO } from 'nswag-api/nswag-api-marathon';
@Component({
    selector: 'app-announcement',
    templateUrl: './announcement.component.html',
    styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
    news: NewsDTO[];

    constructor(private newClient: NewsClient) {}

    ngOnInit() {
        this.newClient.listActive().subscribe((res) => {
            this.news = res.result.items;
        });
    }
}
