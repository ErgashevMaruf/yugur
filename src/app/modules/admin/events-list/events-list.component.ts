import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEventComponent } from './create-event/create-event.component';
import {
    EventBoxDTO,
    EventClient,
    EventDTO,
    TableMetaData,
} from 'nswag-api/nswag-api-marathon';
import { CreateEventService } from './createEvent.service';
import { SelectItem, SelectItemClient } from 'nswag-api/nswag-api-sps';
import { SpService } from 'app/core/services/sp.service';
import { SpSelectItems } from '../sps/SpSelectItems';
import { CreateEventEventBoxComponent } from './createEventEventBox/createEventEventBox.component';
import { environment } from 'app/core/env/environment.prod';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent implements OnInit {
    regions: SelectItem[];
    constructor(
        private dialog: MatDialog,
        public createOrUpdateEvent: CreateEventService,
        public getRegionService: SelectItemClient,
        private spService: SpService,
        private eventClient: EventClient
    ) {}
    tableSearch: TableMetaData;
    eventsList: EventDTO[];
    showIndex: number;
    url = environment.URL;
    EventBoxName: string;
    EventDate: string;
    Status: number;
    status = [
        {
            title: 'Active',
            id: 0,
            class: 'text-[#0CAEEB]',
        },
        {
            title: 'ParticipantsFull',
            id: 1,
            class: 'text-red-600',
        },
        {
            title: 'Finish',
            id: 3,
            class: 'text-[#67BD50]',
        },
        {
            title: 'Results',
            id: 5,
            class: 'text-[#FFD778]',
        },
    ];

    ngOnInit() {
        this.spService.GetSpByTableName(
            SpSelectItems.Sex,
            SpSelectItems.SPRegions,
            SpSelectItems.SPDistricts,
            SpSelectItems.Nations,
            SpSelectItems.UserTypes
        );
    }

    openDialog() {
        const dialog = this.dialog.open(CreateEventComponent);
        dialog.afterClosed().subscribe((res) => {
            if (res == 'ok') {
                this.createOrUpdateEvent.getEventList(
                    new TableMetaData({
                        first: 0,
                        rows: 10,
                        filters: '',
                        sortOrder: 0,
                    })
                );
            }
        });
    }

    openEdit(event: EventDTO) {
        this.createOrUpdateEvent.updateEvent = event;
        const dialog = this.dialog.open(CreateEventComponent, {
            data: event.id,
        });
        dialog.afterClosed().subscribe((res) => {
            if (res == 'ok') {
                this.createOrUpdateEvent.getEventList(
                    new TableMetaData({
                        first: 0,
                        rows: 10,
                        filters: '',
                        sortOrder: 0,
                    })
                );
            }
        });
    }
    openEventBox(i: number, id: number) {
        if (this.showIndex == i) {
            this.showIndex = null;
            return;
        }
        this.eventClient.getByEventBoxIdEventsList(id).subscribe((res) => {
            this.eventsList = res.result.items;
            this.showIndex = i;
        });
    }
    createEvent(event: EventBoxDTO) {
        this.createOrUpdateEvent.eventBoxId = event.id;
        this.createOrUpdateEvent.minDate = new Date(event.startRegstrDate);
        this.createOrUpdateEvent.maxDate = new Date(event.endRegstrDate);
        const dialog = this.dialog.open(CreateEventEventBoxComponent);
        dialog.afterClosed().subscribe((res) => {
            if (res == 'ok') {
                this.createOrUpdateEvent.getEventList(
                    new TableMetaData({
                        first: 0,
                        rows: 10,
                        filters: '',
                        sortOrder: 0,
                    })
                );
            }
            this.showIndex = null;
        });
    }
    editEvent(event: EventDTO, id: number) {
        this.createOrUpdateEvent.eventBoxId = id;
        const dialog = this.dialog.open(CreateEventEventBoxComponent, {
            data: event.id,
        });
        dialog.afterClosed().subscribe((res) => {
            if (res == 'ok') {
                this.showIndex = null;
                this.createOrUpdateEvent.getEventList(
                    new TableMetaData({
                        first: 0,
                        rows: 10,
                        filters: '',
                        sortOrder: 0,
                    })
                );
            }
        });
    }
    clear(table: Table) {
        this.Status = null;
        this.EventDate = null;
        this.EventBoxName = null;
        table.clear();
    }
}
