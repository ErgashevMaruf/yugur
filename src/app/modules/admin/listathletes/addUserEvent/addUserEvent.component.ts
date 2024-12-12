import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TableMetaData } from 'nswag-api/nswag-api-auth';
import {
    AthleteEventDto,
    EventBoxDTO,
    EventClient,
    EventDTO,
    RegistationEventClient,
} from 'nswag-api/nswag-api-marathon';

@Component({
    selector: 'app-addUserEvent',
    templateUrl: './addUserEvent.component.html',
    styleUrls: ['./addUserEvent.component.css'],
})
export class AddUserEventComponent implements OnInit {
    selectedEvent: {
        event: EventDTO;
    } = {
        event: null,
    };
    show = false;
    eventId: number;
    eventBoxes: EventBoxDTO[];
    eventsInsideBox: EventDTO[];

    constructor(
        private eventClient: EventClient,
        private _registrationEvent: RegistationEventClient,
        @Inject(MAT_DIALOG_DATA) public data: number,
        private _dialog:MatDialog
    ) {}

    ngOnInit() {
        this.eventClient
            .getActiveEventBoxesByAthletes(this.data)
            .subscribe((res) => {
                this.eventBoxes = res.result.items;
            });
    }
    getEventId(event: any) {
        this.selectedEvent.event = this.eventsInsideBox.find(
            (el) => el.id == event.value
        );
        this.show = true;
    }
    selectEvent(event) {
        this.show = false;
        this.eventClient.eventBoxById(event.value).subscribe((res) => {
            this.eventsInsideBox = res.result.events;
        });
    }
    cancelNumeration() {
        if(this.show)
        {
            this._registrationEvent.onUpdateAthleteActiveBibNumber(
                new AthleteEventDto({
                    eventId:this.selectedEvent.event.id,
                    athleteId: this.data,
                })
            ).subscribe(res=>{
                this._dialog.closeAll();
            });
        }
        else{
            this._dialog.closeAll();
        }
    }
}
