import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import {
    AthleteStatistics,
    EventBoxMiniDTO,
    EventClient,
    EventStatus,
    StatisticsClient,
} from 'nswag-api-marathon';
import { SelectItemClient } from 'nswag-api-sps';
import { DropdownModule } from 'primeng/dropdown';
import { combineLatest } from 'rxjs';
import { StatisticService } from '../statistic.service';

@Component({
    selector: 'app-recordsmens',
    template: `
        <p class="mb-6 font-[800] text-[24px]">
            {{ 'recordsMens' | transloco }}
        </p>
        <p-dropdown
            styleClass="w-full bg-main mb-4"
            [placeholder]="'CHOOSEeventBox' | transloco"
            [options]="events"
            optionValue="id"
            optionLabel="nameUZ"
            (onChange)="_statistic.getRecordsmen($event, 'eventBox')"
            [showClear]="true"
        ></p-dropdown>
        <p-dropdown
            styleClass="w-full bg-main mb-4"
            [placeholder]="'CHOOSEdistance' | transloco"
            [options]="raceDistances"
            [showClear]="true"
            (onChange)="_statistic.getRecordsmen($event, 'raceDistance')"
        ></p-dropdown>
        @if (result && result?.length!==0) {
        <div class="flex flex-col gap-4">
            <div class="flex  gap-3 items-center">
                <div class="w-[64px] h-[64px] rounded-full p-[14px] bg-main">
                    <img src="./assets/place/1.png" alt="" />
                </div>
                <div>
                    <p
                        class="font-semibold text-[16px] line-clamp-1 text-grey800To300"
                    >
                        {{ result[0].name }}
                    </p>
                    <span class="font-medium text-[#707587]"
                        >{{ result[0].time }}</span
                    >
                </div>
            </div>
            <div class="w-full bg-grey100To800 h-[1px] m-0"></div>
            <div class="flex  gap-3 items-center">
                <div class="w-[64px] h-[64px] rounded-full p-[14px] bg-main">
                    <img src="./assets/place/2.png" alt="" />
                </div>
                <div>
                    <p class="font-semibold text-[16px] text-grey800To300">
                        {{ result[1].name }}
                    </p>
                    <span class="font-medium text-[#707587]">{{
                        result[1].time
                    }}</span>
                </div>
            </div>
            <div class="w-full bg-grey100To800 h-[1px] m-0"></div>
            <div class="flex  gap-3 items-center">
                <div class="w-[64px] h-[64px] rounded-full p-[14px] bg-main">
                    <img src="./assets/place/3.png" alt="" />
                </div>
                <div>
                    <p class="font-semibold text-[16px] text-grey800To300">
                        {{ result[2].name }}
                    </p>
                    <span class="font-medium text-[#707587]"
                        >{{ result[2].time }}</span
                    >
                </div>
            </div>
        </div>
        }
    `,
    styleUrls: ['./recordsmens.component.scss'],
    standalone: true,
    imports: [DropdownModule, TranslocoModule, FormsModule],
})
export class RecordsmensComponent implements OnInit {
    raceDistances: string[];
    evenBoxId: number = 3;
    raceDistance: string = '3 km';
    events: EventBoxMiniDTO[];
    result: AthleteStatistics[];

    constructor(
        private _event: EventClient,
        protected _statistic: StatisticService
    ) {}

    ngOnInit() {
        combineLatest([
            this._event.getAllEventBoxMini(EventStatus.Results),
            this._event.getDistinctRaceDistances(),
        ]).subscribe((res) => {
            this.events = res[0].result;
            this.raceDistances = res[1].result;
        });
        this._statistic.getRecordsmen();
        this._statistic.recordsmen$.subscribe((res) => {
            if (res) {
                this.result = res;
            }
        });
    }
}
