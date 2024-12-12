import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { SpSelectItems } from 'app/modules/admin/sps/SpSelectItems';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexFill,
    ApexGrid,
    ApexLegend,
    ApexPlotOptions,
    ApexResponsive,
    ApexStroke,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis,
    ChartComponent,
    NgApexchartsModule,
} from 'ng-apexcharts';
import { SelectItemClient } from 'nswag-api-sps';
import { SkeletonModule } from 'primeng/skeleton';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    responsive: ApexResponsive[];
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    legend: ApexLegend;
    grid: ApexGrid;
    fill: ApexFill;
    stroke: ApexStroke;
    toolTip: ApexTooltip;
};

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule, TranslocoModule, SkeletonModule],
})
export class StatisticComponent implements OnInit {
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    @Input() positionXaxis = 'bottom';

    @Input() isHorizontal = false;

    @Input() height?: number | string = 350;

    @Input() isCategoriesRegion = true

    private _categories: (string | string[])[] = [
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
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

            if (this.chartOptions?.chart) {
                if (this.categories.length > 20 && this.isHorizontal) {
                    this.chartOptions.chart.height =
                        100 + 50 * this.categories.length;
                } else {
                    this.chartOptions.chart.height = this.height;
                }
            }
        }
    }

    private _series: ApexAxisChartSeries = [
        {
            name: 'Эркак',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
        },
        {
            name: 'Аёл',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
    ];

    public get series(): ApexAxisChartSeries {
        return this._series;
    }

    @Input() barHeight = '48px';
    @Input() columnWidth = '10px';
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

    ngOnInit(): void {
        this.chartOptions = {
            series: this.series,
            chart: {
                type: 'bar',
                height: this.height,
                stacked: true,
                toolbar: {
                    show: false,
                },
            },
            grid: {
                show: false,
            },
            plotOptions: {
                bar: {
                    borderRadius: 3,
                    columnWidth: this.columnWidth,
                    barHeight: this.barHeight,
                    rangeBarGroupRows: true,
                    borderRadiusWhenStacked: 'all',
                    borderRadiusApplication: 'around',
                    horizontal: this.isHorizontal,
                    colors: {
                        backgroundBarColors: ['#F7F8F8'],
                    },
                },
            },
            responsive: [
                {
                    breakpoint: 600,
                    options: {
                        xaxis: {
                            position: 'top',
                        },
                        plotOptions: {
                            bar: {
                                borderRadius: 3,
                                horizontal: true,
                                columnWidth: '5px',
                                barHeight: '20px',
                                rangeBarGroupRows: true,
                                borderRadiusWhenStacked: 'all',
                                borderRadiusApplication: 'around',
                                colors: {
                                    backgroundBarColors: ['#F7F8F8'],
                                },
                            },
                        },
                        chart: {
                            type: 'bar',
                            height: 580,
                        },
                    },
                },
            ],
            xaxis: {
                categories: this.categories,
                axisTicks: {
                    show: false,
                },
                labels: {
                    style: {
                        cssClass:
                            'font-semibold text-[#41434E] text-[14px] dark:text-white',
                    },
                },
                position: this.positionXaxis,
            },
            yaxis: {
                axisBorder: {
                    show: true,
                    width: 1,
                    color: '#EDEDF1',
                },
                labels: {
                    style: {
                        cssClass:
                            'font-semibold text-[#41434E] text-[14px] dark:text-white',
                    },
                },
            },
            fill: {
                opacity: 1,
                colors: ['#0098DA', '#FFD778'],
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 0,
                offsetY: 0,
                markers: {
                    height: 36,
                    width: 6,
                    radius: 5,
                    fillColors: ['#0098DA', '#FFD778'],
                },
                formatter(legendName, opts) {
                    let sum = opts.w.config.series[
                        opts.seriesIndex
                    ].data.reduce((sum, a) => sum + a, 0);
                    return `<div class="h-full font-semibold flex flex-col gap-1 justify-center">
                    <p class="dark:text-[#8E92A2]">${legendName}</p>
            <p class="text-[#707587] dark:text-white  font-medium">${sum}</p>
          </div>`;
                },
            },
            dataLabels: {
                enabled: false,
            },
            toolTip: {
                cssClass: 'dark:bg-[#25262C]',
                shared: true,
                intersect: false,
            },
        };
      if(this.isCategoriesRegion)
      {
        this._selectItem
        .getSelectItems(SpSelectItems.SPRegions)
        .subscribe((regions) => {
            let regionNames = [];
            regions.slice(1).forEach((el) => {
                if (
                    el.value == '10' ||
                    el.value == '11' ||
                    el.value == '23'
                ) {
                    const activeLang = this._lang.getActiveLang();
                    if (activeLang == 'ru-Ru') {
                        if (el.value == '10') {
                            regionNames.push('Таш');
                        }
                        if (el.value == '11') {
                            regionNames.push('Таш.O');
                        }
                        if (el.value == '23') {
                            regionNames.push('Р.Кар');
                        }
                    }
                    if (activeLang == 'en') {
                        if (el.value == '10') {
                            regionNames.push('Tash');
                        }
                        if (el.value == '11') {
                            regionNames.push('Tash.R');
                        }
                        if (el.value == '23') {
                            regionNames.push('R.Kar');
                        }
                    }
                    if (activeLang == 'uz-Latn-UZ') {
                        if (el.value == '10') {
                            regionNames.push('Tash');
                        }
                        if (el.value == '11') {
                            regionNames.push('Tash.V');
                        }
                        if (el.value == '23') {
                            regionNames.push('R.Qar');
                        }
                    }
                } else {
                    regionNames.push(el.label.slice(0, 3));
                    this.chartOptions.xaxis.categories = regionNames;
                    this.chartOptions.xaxis = {
                        ...this.chartOptions.xaxis,
                    };
                }
            });
        });
      }
    }

    constructor(
        private _selectItem: SelectItemClient,
        private _lang: TranslocoService
    ) {}
}
