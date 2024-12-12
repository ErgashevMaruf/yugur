import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { Roles } from 'app/core/user/Roles';
import { UserService } from 'app/core/user/user.service';
import { AccountClient, TableMetaData, UserLogDTO } from 'nswag-api-auth';
import { CalendarModule } from 'primeng/calendar';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-audit',
    templateUrl: './audit.component.html',
    styleUrls: ['./audit.component.scss'],
    standalone: true,
    imports: [
        TableModule,
        TranslocoModule,
        TooltipModule,
        DatePipe,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        DropdownModule,
        CalendarModule,
        FormsModule,
    ],
})
export default class AuditComponent implements OnInit {
    audits: UserLogDTO[];
    isAdmin: boolean;
    date: string;
    roles = [
        {
            label: 'oraganizerRole',
            value: Roles.Organizator,
        },
        {
            label: 'militaryRole',
            value: Roles.MilitaryUser,
        },
        {
            label: 'parentRole',
            value: Roles.Parent,
        },
        {
            label: 'normalUser',
            value: Roles.NormalUser,
        },
        {
            label: 'adminRole',
            value: Roles.Admin,
        },
        {
            label: 'studentRole',
            value: Roles.StudentUser,
        },
        {
            label: 'moderatorRole',
            value: Roles.Moderator,
        },
        {
            label: 'operatorRole',
            value: Roles.Operator,
        },
    ];
    constructor(
        private accountClient: AccountClient,
        private _user: UserService
    ) {}

    totalItems: number;

    tableFilter: TableMetaData = {} as TableMetaData;
    ngOnInit() {
        this._user.isAdmin$.subscribe((res) => {
            this.isAdmin = res;
        });
    }
    loadUserAudit($event) {
        this.tableFilter = Object.assign(this.tableFilter, $event);
        this.tableFilter.filters = JSON.stringify(this.tableFilter.filters);
        this.accountClient.getUserLogList(this.tableFilter).subscribe((res) => {
            this.audits = res.items;
            this.totalItems = res.totalItems;
        });
    }
}
