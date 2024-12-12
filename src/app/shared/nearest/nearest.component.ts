import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from 'app/shared/helper.service';
import { EventBoxDTO, EventDTO } from 'nswag-api-marathon';
import { Observable, interval, map, shareReplay } from 'rxjs';
import { CountdownTimer } from './timer.model';
import {
    DomSanitizer,
    SafeResourceUrl,
} from '@angular/platform-browser';
import { isNumber } from 'lodash';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { AsyncPipe, NgClass } from '@angular/common';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-nearest',
    templateUrl: './nearest.component.html',
    styleUrls: ['./nearest.component.scss'],
    standalone:true,
    imports: [TranslocoModule, AsyncPipe, NgClass, TranslateAsyncPipe, MatIconModule]
})
export class NearestComponent {

   readonly timerProperty = [{value:'days', translate: 'day'}, {value:'hours', translate:'hours'},
         {value:'minutes', translate:'minutes'}, {value:'seconds',translate:'seconds'}]

    public timeLeft$: Observable<CountdownTimer>;
    protected _nearestEvent:EventBoxDTO
    @Input() set nearestEvent(value:EventBoxDTO)
    {
        if(value)
        {
            this._nearestEvent = value
            let day = new Date(value.eventDate).getTime();
            let location = value.location.split(',');
            this.url = this._sanitizier.bypassSecurityTrustResourceUrl(
                `https://maps.google.com/maps?q=${location[0]},${location[1]}&t=&z=15&ie=UTF8&iwloc=&output=embed`
            );
            if(isNumber(day)){
                this.timeLeft$ = interval(1000).pipe(
                    map((x) => this.helperService.getCountdownTimer(day)),
                    shareReplay(1)
                );
            }
        }
    };
    @Input() height = 'h-[600px]'

    activeLang: string;
    
    constructor(
        private helperService: HelperService,
        private _sanitizier: DomSanitizer,
        private translocoService:TranslocoService,
    ) {}
    
    url: SafeResourceUrl;
}
