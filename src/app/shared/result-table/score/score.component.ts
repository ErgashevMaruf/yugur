import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    Input,
    OnInit,
} from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import {
    SelectEvent,
    PublishResultClient,
    AllResultView,
    SelectPublishFilterFormula,
    FilterStatus,
} from 'nswag-api-marathon';
import { TableMetaData } from 'nswag-api-auth';
import { TranslocoModule } from '@ngneat/transloco';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { FormsModule } from '@angular/forms';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.scss'],
    standalone: true,
    imports: [
        TranslocoModule,
        TableModule,
        MatIconModule,
        InputTextModule,
        NgClass,
        TooltipModule,
        CommonModule,
        RouterModule,
        FormsModule,
        DropdownModule,
        TranslateAsyncPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent implements OnInit {
    @Input() event: SelectEvent;
    tableSearch: TableMetaData = {} as TableMetaData;
    totalItems: number;
    language: string;
    athletesResults: AllResultView[];
    name: string;

    surname: string;

    position: string;

    bibcode: string;

    formulaId: number;

    firstTime = true;

    cols: any[];
    widthClass: string;

    mainSearch: SelectPublishFilterFormula[] = [];
    additionalSearch: SelectPublishFilterFormula[] = [];
    protected _isMoble: boolean;
    ranking = [
        'RankOverall',
        'RankGender',
        'RankAge',
        'RankOrganization',
        'RankCoursGender',
        'RankUniversityGender',
    ];
    rankingCols: string[] = [];

    @Input() set isMobile(value) {
        this._isMoble = value;
        this.cdr.markForCheck();
    }
    isAdmin = false;

    constructor(
        private publishResultclient: PublishResultClient,
        private cdr: ChangeDetectorRef,
        private _user: UserService,
        private _router: Router,
        private _publishClient: PublishResultClient
    ) {
        let width = 'w-full';
        if (this._router.url == '/home') {
            width = 'w-[792px]';
        }
        if (this._router.url == '/dashboard') {
            width = 'w-[888px]';
        }
        this.widthClass =
            width +
            ' border border-[#ededf1] dark:border-[#41434E] rounded-b-[16px]';
    }

    ngOnInit() {
        this._user.isAdmin$.subscribe((res) => {
            this.isAdmin = res;
        });
        this.cdr.markForCheck();
        this._publishClient
            .getAllSelectPublishFilterFormula(this.event.eventId)
            .subscribe((res) => {
                this.mainSearch = res.filter(
                    (x) => x.filterStatus == FilterStatus.MainWinner
                );
                this.additionalSearch = res.filter(
                    (x) => x.filterStatus == FilterStatus.OtherWinner
                );
                this.cdr.markForCheck();
            });
        this.publishResultclient
            .publishResultById(this.event.eventId)
            .subscribe((res) => {
                let cols = [];
                for (let [key, value] of Object.entries(res.result)) {
                    if (
                        key !== 'id' &&
                        key !== 'active' &&
                        key !== 'eventId' &&
                        key !== 'isComment' &&
                        value
                    ) {
                        let changeKey =
                            key.slice(2)[0].toLocaleLowerCase() + key.slice(3);
                        if (changeKey == 'spSexId') {
                            changeKey = 'spSex';
                        }
                        cols.push(changeKey);
                    }
                }
                this.cols = cols;
            });
    }
    loadEventResult(event) {
        for (const [key, value] of Object.entries(event.filters)) {
            if (event.filters[key].value == null) {
                delete event.filters[key];
            }
        }
        this.tableSearch = Object.assign(this.tableSearch, event);
        this.tableSearch.filters = JSON.stringify(this.tableSearch.filters);
        this.publishResultclient
            .getAllPuplishResultView(this.event.eventId, this.tableSearch)
            .subscribe((res) => {
                this.athletesResults = res.result.items;
                this.totalItems = res.result.totalItems;
                this.cdr.markForCheck();
            });
    }
    clear(table: Table) {
        this.name = null;
        this.surname = null;
        this.position = null;
        this.bibcode = null;
        this.formulaId = null;
        table.clear();
    }
}
