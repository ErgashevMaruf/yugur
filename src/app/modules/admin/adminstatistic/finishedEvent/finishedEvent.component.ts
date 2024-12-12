import { AsyncPipe, NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
import {
    FinishedEventBoxStatistics,
    ResultStatistics,
} from 'nswag-api/nswag-api-marathon';

@Component({
    selector: 'app-finishedEvent',
    template: `
        <div class="bg-grey50To900 p-4 rounded-[16px] flex flex-col gap-4">
            <p class="text-[16px] font-semibold line-clamp-2 h-[50px]">
                {{ item | appTranslateAsync : 'name' | async }}
            </p>
            <div>
                <p class="text-[12px] font-medium text-[#8E92A2]">
                    Заявок {{ item.totalAthletes }}
                </p>
                <div
                    class="w-full h-[20px] rounded-[50px] flex gap-1 bg-main p-1"
                >
                    <div
                        class="h-full linearGradientGreen rounded-[50px]"
                        [style.width.%]="startWidth"
                    ></div>
                    <div
                        class="h-full linearGradientBlue rounded-[50px]"
                        [style.width.%]="finishWidth"
                    ></div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-3">
                    <mat-icon
                        svgIcon="runLanding"
                        class="text-[#55A93E] font-bold"
                    ></mat-icon>
                    <div class="font-bold">
                        <p class="text-[#55A93E]">
                            {{ 'Started' | transloco }}
                        </p>
                        <p class="text-grey900To100">
                            {{ item.athletesCountAtStart }}
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <mat-icon
                        svgIcon="finishCustom"
                        class="text-[#0CAEEB] font-bold"
                    ></mat-icon>
                    <div class="font-bold">
                        <p class="text-[#0CAEEB]">
                            {{ 'finishedUser' | transloco }}
                        </p>
                        {{ item.atletesCountAtFinish }}
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./finishedEvent.component.css'],
    standalone: true,
    imports: [
        MatIconModule,
        TranslateAsyncPipe,
        AsyncPipe,
        TranslocoModule,
        NgClass,
    ],
})
export class FinishedEventComponent implements OnInit {
    constructor() {}
    startWidth: number;
    finishWidth: number;
    @Input() item: FinishedEventBoxStatistics;
    ngOnInit() {
        this.startWidth =
            ((this.item.athletesCountAtStart - this.item.atletesCountAtFinish) *
                100) /
            this.item.athletesCountAtStart;

        this.finishWidth =
            (this.item.atletesCountAtFinish * 100) /
            this.item.athletesCountAtStart;
    }
}
