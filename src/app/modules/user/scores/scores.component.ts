import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { AnimationOptions } from 'ngx-lottie';
import {
    RegistationEventClient,
    RegistationEventDTO,
    EventClient,
    TableMetaData,
    ResultClient,
    SelectEvent,
    AllResultViewDTO,
    CheckPointDTO,
} from 'nswag-api/nswag-api-marathon';
import { CheckpointComponent } from './checkpoint/checkpoint.component';
import { Table } from 'primeng/table';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
    selector: 'app-scores',
    templateUrl: './scores.component.html',
    styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent implements OnInit {
    eventsResults: RegistationEventDTO[];
    totalItems: number;
    resultExist = true;
    events: SelectEvent[];
    searchEvent: number;
    raceDictance: number;
    activeLang: string;
    result: AllResultViewDTO;
    tableFilter: TableMetaData = {} as TableMetaData;
    athletes: AllResultViewDTO[];
    selectedEvent: number;
    constructor(
        private resultClient: ResultClient,
        private translocoService: TranslocoService,
        private dialog: MatDialog
    ) {}
    tableSearch: TableMetaData = {} as TableMetaData;
    statistics = [];
    rankMock = [
        {
            all: 900,
            rank: 188,
        },
        {
            all: 300,
            rank: 88,
        },
        {
            all: 400,
            rank: 10,
        },
        {
            all: 200,
            rank: 15,
        },
        {
            all: 450,
            rank: 45,
        },
        {
            all: 120,
            rank: 1,
        },
    ];
    ngOnInit() {
        this.resultClient
            .getAllCompletedMarathons(
                new TableMetaData({
                    first: 0,
                    rows: 100,
                    filters: '{}',
                    sortOrder: 0,
                })
            )
            .subscribe((res) => {
                this.events = res.result.items;
                this.selectedEvent = this.events[0]?.eventId
                if (this.events[0]?.eventId) {
                    this.loadEventResult(this.events[0].eventId);
                }
            });
    }
    loadUser(event) {
        for (const [key, value] of Object.entries(event.filters)) {
            if (event.filters[key].value == null) {
                delete event.filters[key];
            }
        }
        this.tableFilter = Object.assign(this.tableFilter, event);
        this.tableFilter.filters = JSON.stringify(this.tableFilter.filters);
        this.resultClient.myResults(this.tableFilter).subscribe((res) => {
            this.athletes = res.result.items;
            this.totalItems = res.result.totalItems;
        });
    }
    loadEventResult(id: number) {
        this.resultClient.getByEventIdMyResult(id).subscribe((res) => {
            this.result = res.result;
        });
    }
    changeEvent(event: DropdownChangeEvent) {
        this.loadEventResult(event.value);
    }
    seeCheckPoint(checkPoints: CheckPointDTO[]) {
        this.dialog.open(CheckpointComponent, {
            data: {
                checkpoints: checkPoints,
            },
        });
    }
    clear(table: Table) {
        this.searchEvent = null;
        this.raceDictance = null;
        table.clear();
    }
}
