import { Component, OnInit } from '@angular/core';
import { UzbekistanMapComponent } from '../uzbekistanMap/uzbekistanMap.component';
import { StatisticComponent } from 'app/shared/statistic/statistic.component';
import { generalSetting } from 'app/core/env/general.setting';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { StatisticsClient } from 'nswag-api/nswag-api-marathon';

@Component({
    selector: 'app-republicStatistic',
    template: `
        <div class="w-full flex gap-2">
            <app-uzbekistanMap class="w-full"></app-uzbekistanMap>
            <div
                class="w-full h-full p-6 border border-[#EDEDF1] dark:border-[#41434E] rounded-2xl"
            >
                <p class="mb-6 font-[800] text-[32px]">
                    {{ 'statisticRespublic' | transloco }}
                </p>
                <app-statistic
                    barHeight="20px"
                    [height]="475"
                    [isHorizontal]="true"
                    [series]="series"
                    positionXaxis="top"
                    [categories]="month"
                    [isCategoriesRegion]="false"
                ></app-statistic>
            </div>
        </div>
    `,
    styleUrls: ['./republicStatistic.component.css'],
    standalone: true,
    imports: [UzbekistanMapComponent, StatisticComponent, TranslocoModule],
})
export class RepublicStatisticComponent implements OnInit {
    series: ApexAxisChartSeries = [
        {
            name: '',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
    ];
    constructor(
        private _statistic: StatisticsClient,
        private _translocoService: TranslocoService
    ) {}
    month: string[];
    ngOnInit() {
        const lang = this._translocoService.getActiveLang();
        if (lang == 'uz-Latn-UZ') {
            this.month = generalSetting.calendarUzLat.monthNamesShort;
        }
        if (lang == 'ru-Ru') {
            this.month = generalSetting.calendarRu.monthNamesShort;
        }
        if (lang == 'en') {
            this.month = generalSetting.calendarEn.monthNamesShort;
        }
        this.getMonthlyEventBox();
    }
    getMonthlyEventBox() {
        this._statistic.getMonthlyEventBoxesCount([]).subscribe((res) => {
            this.series = [
                {
                    name: '',
                    data: res.result,
                },
            ];
        });
    }
}
