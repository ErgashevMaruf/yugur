import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexFill,
    ApexGrid,
    ApexLegend,
    ApexMarkers,
    ApexPlotOptions,
    ApexStroke,
    ApexTitleSubtitle,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis,
    ChartComponent,
    NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
    markers: ApexMarkers;
    yaxis: ApexYAxis;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    tooltip: ApexTooltip;
    legend: ApexLegend;
};

@Component({
    selector: 'app-lineColumnMixed',
    template: `
        @if(show) {
        <div id="chart">
            <apx-chart
                [series]="chartOptions.series"
                [chart]="chartOptions.chart"
                [xaxis]="chartOptions.xaxis"
                [dataLabels]="chartOptions.dataLabels"
                [plotOptions]="chartOptions.plotOptions"
                [grid]="chartOptions.grid"
                [stroke]="chartOptions.stroke"
                [title]="chartOptions.title"
                [markers]="chartOptions.markers"
                [yaxis]="chartOptions.yaxis"
                [fill]="chartOptions.fill"
                [tooltip]="chartOptions.tooltip"
                [legend]="chartOptions.legend"
            ></apx-chart>
        </div>
        }
    `,
    styleUrls: ['./lineColumnMixed.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule],
})
export class LineColumnMixedComponent implements OnInit {
    @ViewChild('chart') chart: ChartComponent;
    show = true;
    public chartOptions: Partial<ChartOptions>;
    barColor = '#F7F8F8';
    @Input() height = 350;

    private _categories: (string | string[])[] = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Okt',
        'Noy',
        'Dek'
    ];

    public get categories(): (string | string[])[] {
        return this._categories;
    }
    @Input()
    public set categories(v: (string | string[])[]) {
        if (v) {
            this._categories = v;
            if (this.chartOptions?.xaxis) {
                this.chartOptions.xaxis.categories = v;
                this.chartOptions.xaxis = { ...this.chartOptions.xaxis };
            }

            // if (this.chartOptions?.chart) {
            //     if (this.categories.length > 20 && this.isHorizontal) {
            //         this.chartOptions.chart.height =
            //             100 + 50 * this.categories.length;
            //     } else {
            //         this.chartOptions.chart.height = this.height;
            //     }
            // }
        }
    }

    private _series: ApexAxisChartSeries = [
        {
            name: 'Max',
            type: 'column',
            data: [148, 148, 148, 148, 148, 148, 148, 148, 148],
        },
        {
            name: 'Gree',
            type: 'line',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
        {
            name: 'Blue',
            type: 'line',
            data: [21, 22, 23, 24, 25, 26, 27, 28, 30],
        },
    ];

    public get series(): ApexAxisChartSeries {
        return this._series;
    }

    @Input()
    public set series(v: ApexAxisChartSeries) {
        if (v) {
            this._series = v;
            if (this.chartOptions) {
                this.chartOptions.series = v;
                if (this.chart) {
                    this.chart.updateSeries(v);
                }
            }
        }
    }

    constructor(private _fuseConfig: FuseConfigService) {}
    ngOnInit(): void {
        this.chartOptions = {
            series: this.series,
            plotOptions: {
                bar: {
                    borderRadius: 8,
                    columnWidth: '40px',
                    barHeight: '48px',
                    rangeBarGroupRows: true,
                    borderRadiusWhenStacked: 'all',
                    borderRadiusApplication: 'around',
                },
            },
            chart: {
                height: this.height,
                type: 'line',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'straight',
                colors: [this.barColor, '#67BD50', '#0098DA'],
            },
            grid: {
                show: false,
                // column: {
                //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                //     opacity: 0.5,
                // },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            xaxis: {
                categories: this.categories,
                labels: {
                    style: {
                        cssClass: 'text-[14px] font-semibold text-grey800To400',
                    },
                },
            },
            yaxis: {
                axisBorder: {
                    show: true,
                    width: 1,
                    color: '#EDEDF1',
                },
                labels: {
                    style: {
                        cssClass: 'text-[14px] font-semibold text-grey800To400',
                    },
                },
            },
            markers: {
                size: 8,
                colors: ['white'],
                strokeColors: [this.barColor, '#67BD50', '#0098DA'],
                strokeWidth: 4,
            },
            fill: {
                opacity: 1,
                colors: [this.barColor, '#67BD50', '#0098DA'],
            },
            tooltip: {
                cssClass: 'dark:bg-[#25262C]',
                enabledOnSeries: [1, 2],
                marker:{
                    fillColors: [this.barColor, '#67BD50', '#0098DA']
                }
            },
            legend: {
                markers: {
                    fillColors: [this.barColor, '#67BD50', '#0098DA'],
                    width: 18,
                    height: 18,
                },
                height: 60,
                position: 'top',
                horizontalAlign: 'left',
                formatter(legendName, opts) {
                    let borderColor;
                    if (opts['seriesIndex'] == 1) {
                        borderColor = '#67BD50';
                    }
                    if (opts['seriesIndex'] == 2) {
                        borderColor = '#0098DA';
                    }
                    return `<div class="flex gap-3 items-center">
                     <div class="w-[18px] h-[18px] rounded-full border-4 border-[${borderColor}]"></div>
                    <p class="font-semibold text-grey800To300">${legendName}</p>
                     </div>`;
                },
            },
        };
        this._fuseConfig.config$.subscribe((res) => {
            this.show = false;
            this.barColor = res.scheme == 'light' ? '#F7F8F8' : '#383942';
            this.chartOptions.fill.colors = [
                this.barColor,
                '#67BD50',
                '#0098DA',
            ];
            this.chartOptions.stroke.colors = [
                this.barColor,
                '#67BD50',
                '#0098DA',
            ];
            this.chartOptions.markers.colors = [
                res.scheme == 'light' ? 'white' : '#383942',
            ];
            setTimeout(() => {
                this.show = true;
            });
        });
    }
}
