import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { InfoService } from 'app/modules/services/info.service';
import { StatisticClient } from 'nswag-api/nswag-api-docflow';
import { StatisticsAll, StatisticsClient } from 'nswag-api/nswag-api-marathon';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
    animations:fuseAnimations
})
export class    InfoComponent implements OnInit {
    eventInfo: any;
    statistics: StatisticsAll;
    constructor(private statisticClient: StatisticsClient) {}

    ngOnInit() {
        this.statisticClient.getAllStatistics(0,100).subscribe((res) => {
            this.statistics = res.result;
        });
    }

}
