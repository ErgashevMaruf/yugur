import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventBoxDTO } from 'nswag-api-marathon';

import { MatDialog } from '@angular/material/dialog';
import { environment } from 'app/core/env/environment.prod';
import { EventType } from './eventType';
import { DetailsComponent } from 'app/modules/user/events/details/details.component';
import { fuseAnimations } from '@fuse/animations';
@Component({
    selector: 'app-carusel',
    templateUrl: './carusel.component.html',
    styleUrls: ['./carusel.component.css'],
    animations: fuseAnimations,
})
export class CaruselComponent {
    @Input() event: EventBoxDTO;
    url = environment.URL;
    @Input() eventType: EventType = EventType.activeEvent;
    @Input() isCircle = true;
    btnStr = 'Join Us';
    constructor(
        private router: Router,
        private dialog: MatDialog
    ) {}
    @Input() inputClass: string;
    @Input() inputHeight: string = '';
    imageSrc: string;
    imageState = true;

    controlAllBtn() {
        if (this.eventType == EventType.activeEvent) {
            this.router.navigateByUrl(`events/details/${this.event.id}`);
        } else if (this.eventType == EventType.landingEvent) {
            this.dialog.open(DetailsComponent, {
                data: { event: this.event, isShared: false },
            });
        } else if (this.eventType == EventType.exportResult) {
            this.router.navigate(['result/exportByEventBox', this.event.id]);
        } else if (this.eventType == EventType.importResult) {
            this.router.navigate(['result/importByEvent', this.event.id]);
        } else if (this.eventType == EventType.organizationUser) {
            this.router.navigate([
                'controleventathletes/controlbyevent',
                this.event.id,
            ]);
        } else if (this.eventType == EventType.myEvent) {
            // this.dialog.open(DetailsComponent, {
            //     data: { event: this.event, isShared: true},
            // });
            this.router.navigateByUrl(
                `events/details/${this.event.id}?myEvent=true`
            );
        }
    }

    gotoEventResult(id: number) {
        this.router.navigate(['eventinfo', id]);
    }
}
