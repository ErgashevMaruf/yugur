import { Component, input, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FuseConfigService } from '@fuse/services/config';
import { TranslocoModule } from '@ngneat/transloco';
import { NumberFormatPipeModule } from 'app/modules/pipes/numberFormat.module';
import {
    ApexChart,
    ApexDataLabels,
    ApexFill,
    ApexLegend,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexResponsive,
    ApexStroke,
    ChartComponent,
    NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    fill: ApexFill;
    legend: ApexLegend;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    plotOptions: ApexPlotOptions;
};

@Component({
    selector: 'app-circle',
    template: `
       <div class="w-full min-w-[280px] h-full flex flex-col justify-between bg-grey50To900 p-6 rounded-[20px]">
            <div #chart
             class="relative w-full flex justify-center">
                @if (show) {
                    <apx-chart
                    [series]="chartOptions.series"
                    [chart]="chartOptions.chart"
                    [labels]="chartOptions.labels"
                    [fill]="chartOptions.fill"
                    [dataLabels]="chartOptions.dataLabels"
                    [responsive]="chartOptions.responsive"
                    [legend]="chartOptions.legend"
                    [stroke]="chartOptions.stroke"
                    [plotOptions]="chartOptions.plotOptions"
                ></apx-chart>
                }
                <div class="h-full w-full flex absolute top-0 flex-col items-center justify-center">
                    <p class="text-[#8E92A2] text-[14px] font-medium w-[100px] break-words text-center">{{'event.participants' | transloco}}</p>
                    <p class="text-grey700To200 font-[800] text-[22px]">{{alluser() | numberFormat}}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-3">
                    <mat-icon
                        svgIcon="runLanding"
                        class="text-[#55A93E] font-bold"
                    ></mat-icon>
                    <div class="font-bold">
                        <p class="text-[#55A93E]">{{'enterStart'| transloco }}</p>
                        <p class="text-grey900To100">{{ startedUser }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <mat-icon
                        svgIcon="finishCustom"
                        class="text-[#0CAEEB] font-bold"
                    ></mat-icon>
                    <div class="font-bold">
                        <p class="text-[#0CAEEB]">{{'finishedUser'  | transloco}}</p>
                        {{ finishedUser}}
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./circle.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule, MatIconModule, TranslocoModule, NumberFormatPipeModule],
})
export class CircleComponent implements OnInit {
    @ViewChild('chart') chart: ChartComponent;
    @Input() startedUser:number;
    @Input() finishedUser:number;
    alluser = input<Number>();
    show = true;
    public chartOptions: Partial<ChartOptions>;
    constructor(private fuseConfig:FuseConfigService) {}
    ngOnInit(): void {
        this.chartOptions = {
            series: [this.finishedUser, this.startedUser    ],
            chart: {
                type: 'donut',
                width: '225px',
                height: '210px'
            },
            dataLabels: {
                enabled: false,
            },
            fill: {
                colors:['#36C5FA', '#65E543'],

            },
            legend: {
                show: false,
                formatter: function (val, opts) {
                    return (
                        val + ' - ' + opts.w.globals.series[opts.seriesIndex]
                    );
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
            stroke: {
                width: 5,
                lineCap: 'round',
                colors: ['#fff']
            },
            plotOptions: {
                pie:{
                    donut:{
                        size: '70px'
                    }
                }
            },
        };
        this.fuseConfig.config$.subscribe(res=>{
            let color = res.scheme=='light'?'#fff':'#000';
            this.chartOptions.stroke.colors = [color];
            this.show = false;
            setTimeout(() => {
                this.show = true;
            });
        })
    }
}
