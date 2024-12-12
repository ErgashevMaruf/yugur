import { Component, OnInit } from '@angular/core';
import { StatisticService } from './statistic.service';
@Component({
    selector: 'app-adminstatistic',
    templateUrl: './adminstatistic.component.html',
    styleUrls: ['./adminstatistic.component.css'],
})
export class AdminstatisticComponent implements OnInit {
    constructor(public _statistic: StatisticService) {}
    ages = [];
    ngOnInit(): void {
        let arr = Array.from({ length: 101 }, (_, idx) => {
            return { label: idx, value: idx };
        });
        this.ages = arr.slice(1);
        this._statistic.getActiveEvents();
        this._statistic.getAllResultStatistics();
        this._statistic.getStatisticRepublic('');
        this._statistic.getAgeStatistics();
    }
}
