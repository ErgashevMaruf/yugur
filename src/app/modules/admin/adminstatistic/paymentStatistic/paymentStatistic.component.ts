import {
    Component,
    OnInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { LineColumnMixedComponent } from '../lineColumnMixed/lineColumnMixed.component';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { NumberFormatPipeModule } from 'app/modules/pipes/numberFormat.module';
import {
    EventBoxMiniDTO,
    EventClient,
    EventStatus,
    StatisticsClient,
} from 'nswag-api-marathon';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { StatisticService } from '../statistic.service';

@Component({
    selector: 'app-paymentStatistic',
    template: `
        <div>
            <p class="mb-6 font-[800] text-[32px]">
                {{ 'statisticPayment' | transloco }}
            </p>
            <div class="w-full flex justify-between gap-6">
                <div class="min-w-[384px] flex flex-col justify-between gap-6">
                    @for (item of ['payme','click','ofb']; track $index) {
                    <div
                        class="w-full p-9 rounded-[20px] bg-grey50To900 justify-between flex items-center"
                    >
                        <img
                            class="w-[100px] h-[52px] dark:hidden"
                            [src]="'./assets/paymentType/' + item + '.svg'"
                        />
                        <img
                            class="w-[100px] h-[52px] hidden dark:block"
                            [src]="'./assets/paymentType/' + item + 'dark.svg'"
                        />
                        <div>
                            <p class="text-grey400To300 font-medium">
                                {{ 'payed' | transloco }}
                            </p>
                            @if (item=='payme') {
                            <p class="text-grey700To100 font-[800] text-[24px]">
                                {{ paymentSum | numberFormat }}
                                {{ 'SUM' | transloco }}
                            </p>
                            } @else {
                            <p class="text-grey700To100 font-[800] text-[24px]">
                                {{ 0 | numberFormat }}
                                {{ 'SUM' | transloco }}
                            </p>
                            }
                        </div>
                    </div>
                    }
                </div>
                <div
                    class="w-full border rounded-[24px] p-6 border-grey100To800 relative"
                >
                    <div class="w-[255px] absolute top-[31px] z-99999">
                        <p-dropdown
                            optionLabel="nameUZ"
                            [placeholder]="'CHOOSEEVENT' | transloco"
                            [options]="events"
                            optionValue="id"
                            [(ngModel)]="_statisticService.eventBoxId"
                            (onChange)="
                                _statisticService.getPaymentStatistic(
                                    null,
                                    $event,
                                    paginator
                                )
                            "
                            appendTo="body"
                            [showClear]="true"
                            styleClass="w-[255px] z-[1000] bg-transparent"
                        ></p-dropdown>
                    </div>
                    <app-lineColumnMixed
                        [categories]="categories"
                        [series]="series"
                    ></app-lineColumnMixed>
                    <p-paginator
                        #paginator
                        [first]="_statisticService.first"
                        (onPageChange)="
                            _statisticService.getPaymentStatistic($event)
                        "
                        [rows]="10"
                        [totalRecords]="totalItems"
                    ></p-paginator>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./paymentStatistic.component.scss'],
    standalone: true,
    imports: [
        DropdownModule,
        LineColumnMixedComponent,
        TranslocoModule,
        NumberFormatPipeModule,
        PaginatorModule,
        FormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentStatisticComponent implements OnInit, AfterViewInit {
    paymentSum = 0;
    events: EventBoxMiniDTO[];
    show = false;
    totalItems = 0;
    chooseEventId = null;
    constructor(
        private _transloco: TranslocoService,
        private _event: EventClient,
        protected _statisticService: StatisticService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}
    ngAfterViewInit(): void {}
    categories = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    series = [
        {
            name: 'max',
            type: 'column',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            name: this._transloco.translate('payedEvent'),
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            name: this._transloco.translate('payedBib'),
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
    ];

    ngOnInit() {
        this._event.getAllEventBoxMini(EventStatus.Finish).subscribe((res) => {
            this.events = res.result;
        });
        this._statisticService.getPaymentStatistic();
        this._statisticService.paymentStatstic$.subscribe((res) => {
            if (res) {
                this.totalItems = res.totalItems;
                this.paymentSum = res.totalAmount;
                this.series[0].data = res.max;
                this.series[1].data = res.event;
                this.series[2].data = res.bib;
                this.series = [...this.series];
                this.categories = res.categories;
                this._changeDetectorRef.markForCheck();
            }
        });
    }
}
