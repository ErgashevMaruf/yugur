import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import {
    RegistationEventClient,
    RegistationEventDTO,
    EventClient,
    EventDTO,
    TableMetaData,
} from 'nswag-api-marathon';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-event-athletes-list',
    templateUrl: './event-athletes-list.component.html',
    styleUrls: ['./event-athletes-list.component.css'],
})
export class EventAthletesListComponent implements OnInit, AfterViewInit {
    list: RegistationEventDTO[];
    tableSearch = new TableMetaData({
        first: 0,
        rows: 10,
        filters: '{}',
        sortOrder: 0,
    });
    events: EventDTO[];
    existEventMore = true;
    search = new Subject<boolean>();
    @ViewChild('placeholder') placeholder!: ElementRef;
    constructor(private eventClient: EventClient) {}

    ngOnInit() {
    //     this.eventClient.eventsList(this.tableSearch).subscribe((res) => {
    //         if (res.result.totalItems < 10) {
    //             this.existEventMore = false;
    //         }
    //         this.events = res.result.items;
    //     });
    //     this.search.subscribe((searchState) => {
    //         if (searchState) {
    //             this.eventClient
    //                 .eventsList(this.tableSearch)
    //                 .subscribe((res) => {
    //                     if (res.result.items.length < 10) {
    //                         this.existEventMore = false;
    //                         return;
    //                     }
    //                     this.events.push(...res.result.items);
    //                 });
    //         }
    //     });
    }
    ngAfterViewInit(): void {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && this.existEventMore) {
                    this.tableSearch.first += 10;
                    this.search.next(true);
                }
            });
        }, options);

        observer.observe(this.placeholder.nativeElement);
    }
}
