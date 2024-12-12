import { Component, OnInit } from '@angular/core';
import { EventBoxDTO, EventClient, EventDTO } from 'nswag-api-marathon';

@Component({
    selector: 'app-myEvents',
    templateUrl: './myEvents.component.html',
    styleUrls: ['./myEvents.component.css'],
})
export class MyEventsComponent implements OnInit {
    constructor(private eventClient: EventClient) {}
    events: EventBoxDTO[]=[];

    ngOnInit() {
        this.eventClient.myEventBoxList().subscribe((res) => {
            this.events = res.result.items;
        });
    }
}
