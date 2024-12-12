import { NgClass } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { StatisticClient } from 'nswag-api/nswag-api-docflow';
import {
    AthleteStatistics,
    Filter,
    StatisticsClient,
} from 'nswag-api/nswag-api-marathon';
import { DropdownModule } from 'primeng/dropdown';
import { StatisticService } from '../statistic.service';

@Component({
    selector: 'app-activeParticipants',
    template: `
        <div class="relative h-full">
            <p class="mb-6 font-[800] text-grey text-[24px]">
                {{ 'activeParticipants' | transloco }}
            </p>
            <div
                class="w-full flex text-[#707587] font-medium justify-between mb-2"
            >
                <p>{{ 'name' | transloco }}</p>
                <p>{{ 'event' | transloco }}</p>
            </div>
            @for (item of activeAthletes; track $index; let even= $even) {
            <div
                class="px-3 py-[10px] rounded-[8px] flex justify-between gap"
                [ngClass]="{ 'bg-main': even }"
            >
                <p class="text-grey800To300 font-semibold">
                    {{ item.name }}
                </p>
                <p class="w-[64px] text-center font-medium text-[#55A93E]">
                    {{ item.participatedEventsCount }}
                </p>
            </div>
            }
            <div
                class="w-full h-[84px]  bgLinearGradient bottom-0 absolute"
            ></div>
        </div>
    `,
    styleUrls: ['./activeParticipants.component.scss'],
    standalone: true,
    imports: [DropdownModule, TranslocoModule, NgClass],
})
export class ActiveParticipantsComponent implements OnInit {
    activeAthletes: AthleteStatistics[];
    constructor(private _statistic: StatisticService) {}

    ngOnInit() {
        this._statistic.getActiveparticipants();
        this._statistic.activeParticipants$.subscribe((res) => {
            if (res) {
                this.activeAthletes = res;
            }
        });
    }
}
