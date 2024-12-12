import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { environment } from 'app/core/env/environment.prod';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
import {
    EventBoxDTO,
    EventClient,
    EventDTO,
    TableMetaData,
} from 'nswag-api/nswag-api-marathon';
import { TooltipModule } from 'primeng/tooltip';
@Component({
    selector: 'app-eventsInfo',
    templateUrl: './eventsInfo.component.html',
    styleUrls: ['./eventsInfo.component.css'],
    standalone: true,
    imports: [
        TranslateAsyncPipe,
        AsyncPipe,
        MatIconModule,
        DatePipe,
        TooltipModule,
        TranslocoModule,
    ],
})
export class EventsInfoComponent implements OnInit {
    constructor(
        private eventClient: EventClient,
        private router: Router    ) {}
    year = new Date().getFullYear();
    events: EventBoxDTO[];
    url = environment.URL;
    @Input() rows = 2;
    @Input() isEventInfo = false;
    @Output() signal = new EventEmitter<number>();
    ngOnInit() {
        this.eventClient
            .allActiveEventEventBoxesList(
                new TableMetaData({
                    first: 0,
                    rows: this.rows,
                    filters: '{}',
                    sortOrder: 0,
                })
            )
            .subscribe((res) => {
                this.events = res.result.items;
            });
    }
    joinEvent(event: EventDTO) {
        if (!this.isEventInfo) {
            this.router.navigateByUrl(`/events/${event.id}`);
        } else {
            this.router.navigateByUrl(`/details/${event.id}`);
            this.signal.emit(event.id);
        }
    }
}
