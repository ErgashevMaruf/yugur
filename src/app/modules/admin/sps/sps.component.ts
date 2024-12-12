import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SelectItem } from 'nswag-api/nswag-api-auth';
import { SelectItemClient } from 'nswag-api/nswag-api-sps';
import { SpBaseListComponent } from './sp-base-table/sp-base-list/sp-base-list.component';
import { SpsService } from './sps.service';

@Component({
    selector: 'app-sps',
    templateUrl: './sps.component.html',
    styleUrls: ['./sps.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class SpsComponent implements OnInit {
    @ViewChild('spList') public currentSpObject: SpBaseListComponent;
    selItem: SelectItem;
    filteredSp: SelectItem[];
    isLoadSp = false;
    constructor(private spsService: SpsService) {}

    ngOnInit() {
        this.spsService._spsInfo.subscribe((x) => {
            this.filteredSp = x;
        });
    }
    selectSP(selectSp): void {
        this.isLoadSp = false;
        this.selItem = selectSp;
        this.spsService._curSpsInfo = this.selItem;
        this.spsService._selectSp.next(this.selItem);
        this.isLoadSp = true;
    }
}
