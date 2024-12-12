import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpService } from 'app/core/services/sp.service';
import {
    EventBoxDTO,
    EventClient,
    EventDTO,
    FilesClient,
    TableMetaData,
} from 'nswag-api/nswag-api-marathon';
import { Message } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CreateEventService {
    category: any;
    price: string;
    districtLabel: string;
    updateEvent: any;
    tableSearch: TableMetaData = {} as TableMetaData;
    events: EventBoxDTO[];
    totalItems: number;
    minDate:Date;
    maxDate:Date;
    eventBoxId: number;

    constructor(
        private spService: SpService,
        private eventClient: EventClient
    ) {}
    images: string[] = [];
    reset() {
        this.category = [];
        this.updateEvent = [];
    }
    getEventList(event) {
        for (const [key, value] of Object.entries(event.filters)) {
            if(event.filters[key]?.value==null){
                delete event.filters[key];
            }
          }
        this.tableSearch = Object.assign(this.tableSearch, event);
        this.tableSearch.filters = JSON.stringify(this.tableSearch.filters);
        this.eventClient.eventBoxesList(this.tableSearch).subscribe((res) => {
            this.events = res.result.items;
            this.totalItems = res.result.totalItems;
        });
    }
}
