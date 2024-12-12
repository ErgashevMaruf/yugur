import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { LineColumnMixedComponent } from '../lineColumnMixed/lineColumnMixed.component';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { SelectItem, SelectItemClient } from 'nswag-api/nswag-api-sps';
import { SpSelectItems } from '../../sps/SpSelectItems';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { StatisticsClient } from 'nswag-api/nswag-api-marathon';
import { StatisticService } from '../statistic.service';

@Component({
    selector: 'app-participantStatistic',
    template: `
        <div
            class="w-full border rounded-[24px] p-6 border-grey100To800 relative"
        >
            <div class="w-[255px] absolute top-[31px] z-99999">
                <p-dropdown
                    [showClear]="true"
                    [placeholder]="'CHOOSE' | transloco"
                    [options]="regions"
                    (onChange)="_statistic.getStatisticsParticipants($event)"
                    optionValue="value"
                    optionLabel="label"
                    appendTo="body"
                    styleClass="w-[255px] z-[1000] bg-transparent"
                ></p-dropdown>
            </div>
            <app-lineColumnMixed
                height="440px"
                [series]="series"
            ></app-lineColumnMixed>
        </div>
    `,
    styleUrls: ['./participantStatistic.component.scss'],
    standalone: true,
    imports: [LineColumnMixedComponent, DropdownModule, TranslocoModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantStatisticComponent implements OnInit {
    series = [
        {
            name: 'Max',
            type: 'column',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            name: this._transloco.translate('participants'),
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
    ];
    regions: SelectItem[];
    constructor(
        private _selectItem: SelectItemClient,
        protected _statistic: StatisticService,
        private _transloco: TranslocoService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this._selectItem
            .getSelectItems(SpSelectItems.SPRegions)
            .subscribe((res) => {
                this.regions = res.slice(1);
            });
        this._statistic.getStatisticsParticipants();
        this._statistic.participantsStatistics$.subscribe((res) => {
            if (res) {
                this.series[0].data = res.max;
                this.series[1].data = res.participants;
                this.series = [...this.series];
                this._changeDetectorRef.markForCheck();
            }
        });
    }
}
