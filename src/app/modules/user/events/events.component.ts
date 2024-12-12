import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventBoxDTO, EventClient, EventDTO } from 'nswag-api/nswag-api-marathon';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
    event: EventBoxDTO;
    location: string;
    isMyEvent = false;
    activeEvent: EventDTO;
    constructor(
        private activatedRoute: ActivatedRoute,
        private eventClient: EventClient
    ) {
        this.activatedRoute.queryParams.subscribe((res) => {
            if (res.myEvent) {
                this.isMyEvent = true;
            }
            let id = +this.activatedRoute.snapshot.paramMap.get('id');
            this.getEvent(id);
        });
    }
    ngOnInit(): void {
        localStorage.removeItem('eventId');
    }
    getEvent(eventId: number) {
        this.eventClient.eventBoxById(eventId).subscribe((res) => {
            if (this.isMyEvent) {
                this.activeEvent = res.result.events.find(
                    (el) => el.id == res.result.myRegistrationEvent.eventId
                );
            }
            this.event = res.result;
        });
    }
}
