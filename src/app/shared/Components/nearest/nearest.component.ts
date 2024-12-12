import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from 'app/shared/helper.service';
import { EventBoxDTO, EventDTO } from 'nswag-api/nswag-api-marathon';
import { Observable, interval, map, shareReplay } from 'rxjs';
import { CountdownTimer } from './timer.model';
import {
    DomSanitizer,
    SafeResourceUrl,
} from '@angular/platform-browser';
import { isNumber } from 'lodash';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'app-nearest',
    templateUrl: './nearest.component.html',
    styleUrls: ['./nearest.component.scss'],
})
export class NearestComponent implements OnInit {
    public timeLeft$: Observable<CountdownTimer>;
    @Input() nearestEvent?: EventBoxDTO;
    @Input() height = 'h-[600px]'
    activeLang: string;
    constructor(
        private helperService: HelperService,
        private _sanitizier: DomSanitizer,
        private translocoService:TranslocoService,
    ) {}
    url: SafeResourceUrl;
    ngOnInit(): void {
        let day = new Date(this.nearestEvent?.eventDate).getTime();
        let location = this.nearestEvent.location.split(',');
        this.url = this._sanitizier.bypassSecurityTrustResourceUrl(
            `https://maps.google.com/maps?q=${location[0]},${location[1]}&t=&z=15&ie=UTF8&iwloc=&output=embed`
        );
        if(isNumber(day)){
            this.timeLeft$ = interval(1000).pipe(
                map((x) => this.helperService.getCountdownTimer(day)),
                shareReplay(1)
            );
        }
        this.activeLang = this.translocoService.getActiveLang().slice(0,2);
        this.activeLang = this.activeLang=='uz'?"":this.activeLang;
        this.activeLang = this.activeLang.length!==0 ?
        this.activeLang[0].toUpperCase()+this.activeLang[1]
        :this.activeLang
    }
}
