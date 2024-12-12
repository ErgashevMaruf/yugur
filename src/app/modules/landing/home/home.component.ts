import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config';
import { TranslocoService } from '@ngneat/transloco';
import { Theme } from 'app/core/config/app.config';
import { UserService } from 'app/core/user/user.service';
import { EventBoxDTO, EventClient, StatisticsClient } from 'nswag-api/nswag-api-marathon';
import { InfoForVisitorComponent } from './infoForVisitor/infoForVisitor.component';
import { SelectItemClient } from 'nswag-api/nswag-api-sps';
import { SpSelectItems } from 'app/modules/admin/sps/SpSelectItems';

@Component({
    selector: 'landing-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.style.css'],
    animations: fuseAnimations,
})
export class LandingHomeComponent implements AfterViewInit {
    selectedItem = 'photoGallery';
    listItems: any;
    username = new FormControl();
    nearestEvent: EventBoxDTO;
    haveNearestEvent = false;
    isDetailShow = false;
    showBot = false;
    showMobileHover = false;
    statisticCategories: string[];
    statisticSeries: {
        name: string;
        data: number[];
    }[];
    /**
     * Constructor
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private eventClient: EventClient,
        private cdr: ChangeDetectorRef,
        private _user: UserService,
        private _lang: TranslocoService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _matdialog: MatDialog,
        private _statistic: StatisticsClient,
        protected _selectItem: SelectItemClient
    ) {}
    language: string;
    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    photoBanner = 'banner';
    ngOnInit(): void {
        if (!localStorage.getItem('firstTimePopUp')) {
            this._matdialog.open(InfoForVisitorComponent);
        }
        this._activatedRoute.queryParams.subscribe((res) => {
            if (res.lang == 'uz' || res.lang == 'ru') {
                const lang = res.lang == 'uz' ? 'uz-Latn-UZ' : 'ru-Ru';
                localStorage.setItem('lang', lang);
                this._lang.setActiveLang(lang);
                this._router.navigate(['/home']);
            }
        });
        this.listItems = [
            {
                label: this._lang.translate('customGallery'),
                value: 'photoGallery',
            },
            {
                label: this._lang.translate('customVideo'),
                value: 'videoGallery',
            },
        ];
        this.eventClient.getNoteFirstEvents().subscribe((res) => {
            if (res) {
                this.nearestEvent = res.result;
                this.haveNearestEvent = true;
            }
        });
        this._user.isSmallScreen = false;
        this.getStatistic();
    }
    getStatistic() {
        this._statistic.getAllStatistics(0, 100).subscribe((res) => {
            this.statisticSeries = [
                {
                    name: this._lang.translate('Men'),
                    data: res.result.statisticsByRegions
                        .menCountByRegions,
                },
                {
                    name: this._lang.translate('woman'),
                    data: res.result.statisticsByRegions
                        .womenCountByRegions,
                },
            ];
        });
    }
    setScheme(theme: Theme) {
        this._fuseConfigService.config = { theme };
    }
    moveSection(section) {
        document
            .querySelector(`${section}`)
            .scrollIntoView({ behavior: 'smooth' });
    }
}
