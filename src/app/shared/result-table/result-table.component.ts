import { Component, HostListener, Input, OnInit } from '@angular/core';
import { EventClient, SelectEvent, TableMetaData } from 'nswag-api/nswag-api-marathon';
import { TableModule } from 'primeng/table';
import { NumberFormatPipeModule } from 'app/modules/pipes/numberFormat.module';
import { ScoreComponent } from './score/score.component';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MatIconModule } from '@angular/material/icon';

import { BehaviorSubject, Subject } from 'rxjs';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
    selector: 'app-result-table',
    templateUrl: './result-table.component.html',
    styleUrls: ['./result-table.component.scss'],
    standalone: true,
    imports: [
    TableModule,
    ScoreComponent,
    NumberFormatPipeModule,
    MatIconModule,
    TranslateAsyncPipe,
    TranslocoModule,
    AsyncPipe,
    NgClass
],
})
export class ResultTableComponent implements OnInit {
    language: string;
    isMobile = false;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth < 960) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

    constructor(
        private _eventClient: EventClient,
        private _translocoService: TranslocoService
    ) {}
    tableSearch: TableMetaData = {} as TableMetaData;
    finishedEvents: SelectEvent[] = [];
    totalItems: number;
    resultReady = new BehaviorSubject<boolean>(false);
    showId = 0;
    @Input() set inputShowId(value: boolean) {
        this.resultReady.subscribe((res) => {
            if (res && value) {
                this.showId = this.finishedEvents[0].eventId;
            }
        });
    }
    ngOnInit() {
        if (window.innerWidth < 960) {
            this.isMobile = true;
        }
        this.language =
            this._translocoService.getActiveLang().slice(0, 2) == 'uz'
                ? ''
                : this._translocoService.getActiveLang().slice(0, 2) == 'ru'
                ? 'Ru'
                : 'En';
    }
    loadEvents(event) {
        for (const [key, value] of Object.entries(event.filters)) {
            if (event.filters[key].value == null) {
                delete event.filters[key];
            }
        }
        this.tableSearch = Object.assign(this.tableSearch, event);
        this.tableSearch.filters = JSON.stringify(this.tableSearch.filters);
        this._eventClient
            .allResultEventList(this.tableSearch)
            .subscribe((res) => {
                this.finishedEvents = res.result.items;
                this.totalItems = res.result.totalItems;
                this.resultReady.next(true);
            });
    }
    showTable(eventId: number) {
        this.showId = eventId;
    }
}
