import { AsyncPipe, NgClass } from '@angular/common';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { StatisticClient } from 'nswag-api-docflow';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { TooltipModule } from 'primeng/tooltip';
import { ActiveEventBoxStatisticsWithIndex } from '../statistic.service';

@Component({
    selector: 'app-waterAnimation',
    template: `
        <div
            class="bg-grey50To900 font-semibold max-w-[300px] flex flex-col gap-3
        text-[20px] rounded-[20px] p-6"
        >
            @if(item | appTranslateAsync : 'name' | async; as name) {
            <p [pTooltip]="name" class="font-semibold line-clamp-2 h-[60px] text-[20px] cursor-pointer">
                {{ name }}
            </p>
            }
            <div class="circle-container">
                <div
                    class="absolute w-[186px] h-[186px] bg-main  top-[-18px] left-[-18px]
                 rounded-full border-2 border-opacity-40  border-[#B6B9C3]"
                ></div>
                <div class="circle"></div>
                <div
                    class=""
                    [ngClass]="backgroundImg + ' ' + '_' + percentage"
                ></div>
                <div
                    class=""
                    [ngClass]="backgroundImg + ' ' + '_' + percentage"
                ></div>
                <div
                    class=""
                    [ngClass]="backgroundImg + ' ' + '_' + percentage"
                ></div>
                <div
                    class=""
                    [ngClass]="backgroundColor + ' ' + '_' + percentage"
                ></div>
                <div class="desc" [ngClass]="'_' + percentage">
                    <p>{{ item.fullnessPercentage }}%</p>
                </div>
            </div>
            <div>
                <p>
                    <span>{{ item.registeredAthletesCount }}</span
                    >/ <span>{{ item.totalCapacity }}</span>
                </p>
                <p class="text-[#707587]">{{ 'placeFull' | transloco }}</p>
            </div>
        </div>
    `,
    styleUrls: ['./waterAnimation.component.css'],
    standalone: true,
    imports: [
        NgClass,
        TranslateAsyncPipe,
        AsyncPipe,
        TranslocoModule,
        TooltipModule,
    ],
})
export class WaterAnimationComponent implements OnInit {
    @Input() item: ActiveEventBoxStatisticsWithIndex;
    show = false;
    backgroundImg: string;
    backgroundColor: string;
    percentage: number;
    constructor(
        private _statistic: StatisticClient,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        this.percentage = Math.round(this.item.fullnessPercentage / 10) * 10;

        this.setDynamicStyles();
    }

    setDynamicStyles() {
        if (this.item.index % 3 == 0) {
            this.backgroundColor = 'wave-below-green';
            this.backgroundImg = 'wave-green';
        } else if (this.item.index % 3 == 1) {
            this.backgroundColor = 'wave-below-blue';
            this.backgroundImg = 'wave-blue';
        } else {
            this.backgroundColor = 'wave-below-pink';
            this.backgroundImg = 'wave-pink';
        }

        this.show = true;
    }
}
