import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { CaruselModule } from 'app/shared/carusel/carusel.module';
import { DebounceInputDirective } from 'app/shared/directives/debounce-input.directive';
import { EventBoxDTO, EventClient, TableMetaData } from 'nswag-api/nswag-api-marathon';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-showEvents',
    template: `
        <div class="w-full p-[30px]">
            <h3 class="md:text-[25px] text-[20px] font-bold mb-[10px]">
                @if (type==4) {
                {{ 'joinAthletesList' | transloco }}
                } @else {
                {{ 'importJoinAthletes' | transloco }}
                }
            </h3>
            <div class="w-full flex gap-4 mb-4 items-center">
                <p-iconField iconPosition="right">
                    <p-inputIcon>
                        <i class="pi pi-search"></i>
                    </p-inputIcon>
                    <input
                        pInputText
                        class="bg-transparent"
                        type="text"
                        [(ngModel)]="filters.EventBoxName.value"
                        debonceInput
                        (search)="getEvents()"
                        placeholder="{{ 'eventName' | transloco }}"
                    />
                </p-iconField>
                <p-iconField iconPosition="right">
                    <p-inputIcon>
                        <i class="pi pi-calendar"></i>
                    </p-inputIcon>
                    <p-calendar
                        styleClass="bg-transparent"
                        [placeholder]="'searchByEventDate' | transloco"
                        dateFormat="dd.mm.yy"
                        (onSelect)="getEvents()"
                        [(ngModel)]="filters.EventDate.value"
                        (onInput)="getEvents()"
                        dataType="string"
                    ></p-calendar>
                </p-iconField>
                <p-dropdown
                    [options]="status"
                    styleClass="bg-transparent"
                    optionLabel="title"
                    optionValue="id"
                    [placeholder]="'CHOOSE' | transloco"
                    [(ngModel)]="filters.Status.value"
                    (onChange)="getEvents()"
                ></p-dropdown>
                @if (showFilterClean) {
                <p-button
                    icon="pi pi-filter-slash"
                    styleClass="bg-blue-600"
                    (onClick)="getEvents(true)"
                ></p-button>
                }
            </div>
            <div
                class="w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-[20px]"
            >
                @for (event of events; track event) {
                <div class="rounded-[10px]">
                    <app-carusel
                        [event]="event"
                        [isCircle]="false"
                        [eventType]="type"
                    ></app-carusel>
                </div>
                }
            </div>
        </div>
    `,
    styles: `
        :host ::ng-deep .p-inputtext
        {
            background:transparent;
        }
    `,
    standalone: true,
    imports: [
        TableModule,
        InputIconModule,
        IconFieldModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        CalendarModule,
        FormsModule,
        TranslocoModule,
        CaruselModule,
        DebounceInputDirective,
    ],
})
export class ShowEventsComponent implements OnInit {
    events: EventBoxDTO[];
    showFilterClean = false;

    filters = {
        EventBoxName: {
            value: null,
        },
        EventDate: {
            value: null,
        },
        Status: {
            value: null,
        },
    };

    status = [
        {
            title: 'Active',
            id: 0,
        },
        {
            title: 'ParticipantsFull',
            id: 1,
        },
        {
            title: 'Finish',
            id: 3,
        },
        {
            title: 'Results',
            id: 5,
        },
    ];

    type: number = 5;
    isFinish = true

    constructor(
        private eventclient: EventClient,
        private _activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        if (this._activatedRoute.snapshot.routeConfig.path == 'exportResult') {
            this.type = 4;
            this.isFinish = false
        }
        this.getEvents();
    }

    getEvents(filterClean = false) {
        let searchObj = { ...this.filters };
        if (!filterClean) {
            for (let [key, value] of Object.entries(searchObj)) {
                if (!value.value) {
                    delete searchObj[key];
                }
            }
        } else {
            searchObj = Object.assign({});
            this.filters.EventBoxName.value = null;
            this.filters.EventDate.value = null;
            this.filters.Status.value = null;
        }
        this.showFilterClean = Object.keys(searchObj).length !== 0;
        this.eventclient
            .allEventBoxesList(
                new TableMetaData({
                    first: 0,
                    rows: 60,
                    filters: JSON.stringify(searchObj),
                    sortOrder: 0,
                }),
                this.isFinish
            )
            .subscribe((res) => {
                this.events = res.result.items;
            });
    }
}
