import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import {
    ActiveEventBoxStatistics,
    AthleteStatistics,
    Filter,
    FinishedEventBoxStatistics,
    RegionStatistics,
    StatisticsByAllRegions,
    StatisticsClient,
    TableMetaData,
    TopAthleteInfoDTO,
    UniversityStatistics,
} from 'nswag-api-marathon';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { BehaviorSubject } from 'rxjs';

export interface ActiveEventBoxStatisticsWithIndex
    extends ActiveEventBoxStatistics {
    index: number;
}

export interface PaymentStatistic {
    categories: number[];
    bib: number[];
    event: number[];
    max: number[];
    totalItems: number;
    totalAmount: number;
}

export interface ParticipantsStatistics {
    max: number[];
    participants: number[];
}

@Injectable({
    providedIn: 'root',
})
export class StatisticService {
    year = new Date().getFullYear();
    activeItem = 'event'; //event participants
    ageFrom = null;
    ageTo = null;
    eventBoxId = null;
    first = 0;
    page = 0;
    seriesAge = [
        {
            name: this._lang.translate('Men'),
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            name: this._lang.translate('women'),
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
    ];

    activeEvents: ActiveEventBoxStatistics[] = [];
    finishedEvents: FinishedEventBoxStatistics[];
    info: RegionStatistics;
    paymentStatstic$ = new BehaviorSubject<PaymentStatistic>(null);
    participantsStatistics$ = new BehaviorSubject<ParticipantsStatistics>(null);
    recordsmen$ = new BehaviorSubject<AthleteStatistics[]>(null);
    recordsMenEventBoxId: string;
    recordsMenRaceDistance: string;
    activeParticipants$ = new BehaviorSubject<AthleteStatistics[]>(null);
    ageStatistics: StatisticsByAllRegions;
    topAthletesTable = {} as TableMetaData;
    universitetesTable = {} as TableMetaData;
    topAthletes: TopAthleteInfoDTO[];
    totalItemsTopAthletes: number;
    univsersityTable = {} as TableMetaData;
    userFromUniversity: TopAthleteInfoDTO[];
    userFromUniversityTotalItems: number;
    universitetes: UniversityStatistics[];
    universitetesTotalItems: number;

    constructor(
        private _statistic: StatisticsClient,
        private _lang: TranslocoService
    ) {}
    // change after api taken
    getAllResultStatistics() {
        this._statistic
            .getFinishedEventBoxesStatistics(
                new TableMetaData({
                    first: 0,
                    rows: 10,
                    filters: JSON.stringify({
                        year: {
                            value: this.year,
                        },
                    }),
                    sortOrder: 0,
                })
            )
            .subscribe((res) => {
                this.finishedEvents = res.result;
            });
    }

    getActiveEvents() {
        this._statistic
            .getActiveEventBoxesStatistics([
                new Filter({
                    key: 'year',
                    value: this.year + '',
                }),
            ])
            .subscribe((res) => {
                let arr = [];
                res.result.forEach((value, index) => {
                    const el = { ...value, index: index };
                    arr.push(el);
                });
                this.activeEvents = arr;
            });
    }

    getStatisticRepublic(regionCode: string | number) {
        const filterArr = [
            new Filter({
                key: 'year',
                value: this.year + '',
            }),
        ];
        if (regionCode) {
            filterArr.push(
                new Filter({
                    key: 'regionId',
                    value: regionCode + '',
                })
            );
        }
        this._statistic
            .getRegistrationEventsCountByRegion(filterArr)
            .subscribe((res) => {
                this.info = res.result;
            });
    }

    getPaymentStatistic(
        paginator?: any,
        dropdownItem?: any,
        paginatorComponent?: any
    ) {
        if (paginator) {
            this.page = paginator.page;
        }
        if (dropdownItem) {
            this.page = 0;
            this.first = 0;
            paginatorComponent.first = 0;
        }

        this._statistic
            .getPaymentStatisticsOfEventBox([
                new Filter({
                    key: 'pageNumber',
                    value: this.page + '',
                }),
                new Filter({
                    key: 'eventBoxId',
                    value: this.eventBoxId + '',
                }),
                new Filter({
                    key: 'year',
                    value: this.year + '',
                }),
            ])
            .subscribe((res) => {
                let maxElement = 0;
                for (let x of res.result.dailyPayments) {
                    if (x.totalPaidAmountForBibNumber > maxElement) {
                        maxElement = x.totalPaidAmountForBibNumber;
                    }
                    if (x.totalPaidAmountForEventPacket > maxElement) {
                        maxElement = x.totalPaidAmountForEventPacket;
                    }
                }
                let categories = [];
                let bib = [];
                let event = [];
                let max = [];
                for (let x of res.result.dailyPayments) {
                    categories.push(x.date);
                    bib.push(x.totalPaidAmountForBibNumber);
                    event.push(x.totalPaidAmountForEventPacket);
                    max.push(maxElement);
                }
                this.paymentStatstic$.next({
                    categories: categories,
                    bib: bib,
                    event: event,
                    max: max,
                    totalItems: res.result.totalItems,
                    totalAmount: res.result.totalPaidAmountByPayme,
                });
            });
    }

    getStatisticsParticipants(dropDownEvent?: any) {
        let regionId = null;
        if (dropDownEvent) {
            regionId = dropDownEvent.value;
        }
        this._statistic
            .getMonthlyRegistrationEvents([
                new Filter({
                    key: 'regionId',
                    value: regionId + '',
                }),
                new Filter({
                    key: 'year',
                    value: this.year + '',
                }),
            ])
            .subscribe((res) => {
                let max = 0;
                for (let x of res.result) {
                    if (x > max) {
                        max = x;
                    }
                }
                const maxArr = new Array(12).fill(max);
                this.participantsStatistics$.next({
                    max: maxArr,
                    participants: res.result,
                });
            });
    }

    getRecordsmen(value?: DropdownChangeEvent, changeType?: string) {
        const filterArr = [
            new Filter({
                key: 'year',
                value: this.year + '',
            }),
        ];
        if (changeType == 'eventBox') {
            this.recordsMenEventBoxId = value.value;
        }
        if (changeType == 'raceDistance') {
            this.recordsMenRaceDistance = value.value;
        }
        if (this.recordsMenEventBoxId) {
            filterArr.push(
                new Filter({
                    key: 'eventBoxId',
                    value: this.recordsMenEventBoxId + '',
                })
            );
        }
        if (this.recordsMenRaceDistance) {
            filterArr.push(
                new Filter({
                    key: 'raceDistance',
                    value: this.recordsMenRaceDistance,
                })
            );
        }
        this._statistic.getRecordsmenList(filterArr).subscribe((res) => {
            this.recordsmen$.next(res.result);
        });
    }

    getAgeStatistics(value?: DropdownChangeEvent, type?: string) {
        if (type == 'ageFrom') {
            this.ageFrom = value.value;
        }
        if (type == 'ageTo') {
            this.ageTo = value.value;
        }
        const filterArr = [
            new Filter({
                key: 'year',
                value: this.year + '',
            }),
        ];
        if (this.ageFrom) {
            filterArr.push(
                new Filter({
                    key: 'ageFrom',
                    value: this.ageFrom + '',
                })
            );
        }
        if (this.ageTo) {
            filterArr.push(
                new Filter({
                    key: 'ageTo',
                    value: this.ageTo + '',
                })
            );
        }
        this._statistic
            .getAthleteCountsByRegions(this.ageFrom, this.ageTo)
            .subscribe((res) => {
                this.seriesAge[0].data = res.result.menCountByRegions;
                this.seriesAge[1].data = res.result.womenCountByRegions;
                this.seriesAge = [...this.seriesAge];
            });
    }

    getActiveparticipants() {
        this._statistic
            .getActiveAthletes([
                new Filter({
                    key: 'year',
                    value: this.year + '',
                }),
            ])
            .subscribe((res) => {
                this.activeParticipants$.next(res.result);
            });
    }

    getTopAthletes(event) {
        event.filters = {
            ...event.filters,
            year: {
                value: this.year + '',
            },
        };
        this.topAthletesTable = Object.assign({}, event);
        this.topAthletesTable.filters = JSON.stringify(
            this.topAthletesTable.filters
        );
        this._statistic
            .getTopAthletes(this.topAthletesTable)
            .subscribe((res) => {
                this.topAthletes = res.result.items;
                this.totalItemsTopAthletes = res.result.totalItems;
            });
    }

    getUserFromUniversity(event) {
        event.filters = {
            ...event.filters,
            year: {
                value: this.year + '',
            },
        };
        this.univsersityTable = Object.assign({}, event);
        this.univsersityTable.filters = JSON.stringify(
            this.univsersityTable.filters
        );
        this._statistic
            .getTopUniversityAthletes(this.univsersityTable)
            .subscribe((res) => {
                this.userFromUniversity = res.result.items;
                this.userFromUniversityTotalItems = res.result.totalItems;
            });
    }
    getUniversitetes(event) {
        event.filters = {
            ...event.filters,
            year: {
                value: this.year + '',
            },
        };
        this.universitetesTable = Object.assign({}, event);
        this.universitetesTable.filters = JSON.stringify(
            this.universitetesTable.filters
        );
        this._statistic
            .getUniversitiesStatistics(this.universitetesTable)
            .subscribe((res) => {
                this.universitetes = res.result.items;
                this.universitetesTotalItems = res.result.totalItems;
            });
    }
}
