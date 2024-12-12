import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import {
    EventBoxDTO,
    EventClient,
    TableMetaData,
} from 'nswag-api-marathon';
import { WorkplaceComponent } from './workplace/workplace.component';
import { Roles } from 'app/core/user/Roles';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
    events: EventBoxDTO[]=[];
    isHaveManyEvent = false;
    isScreenSmall=false;
    isHasWorkplace = false;
    constructor(
        public _user: UserService,
        public eventClient: EventClient,
        private activeEvents: EventClient,
        private cdr: ChangeDetectorRef,
        private matdialog:MatDialog
    ) {}
    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }
    ngOnInit(): void {
        this._user.user$.subscribe(res=>{
            if(!res.workPlaceCommit && res.mainRole==Roles.NormalUser && !this.isHasWorkplace)
            {
                this.isHasWorkplace = true;
                this.matdialog.open(WorkplaceComponent, {
                    disableClose:true
                })
            }
        })
        this.getComingEvents();
        this._user.isSmallScreen$.subscribe(res=>{
            this.isScreenSmall = res
        })
    }

    getComingEvents() {
        this.activeEvents
            .allActiveEventEventBoxesList(
                new TableMetaData({
                    first: 0,
                    rows: 3,
                    filters: '{}',
                    sortOrder: 0,
                })
            )
            .subscribe((res) => {
                this.events = res.result.items;
                if (res.result.totalItems > 3) {
                    this.isHaveManyEvent = true;
                }
            });
    }
}
