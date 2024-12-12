import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
import { TableMetaData } from 'nswag-api/nswag-api-auth';
import { StatisticsClient, TopAthleteInfoDTO } from 'nswag-api/nswag-api-marathon';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { StatisticService } from '../statistic.service';

@Component({
    selector: 'app-university-user-table',
    template: `
        <p-table
            #dt
            [value]="_statistic.userFromUniversity"
            [totalRecords]="_statistic.userFromUniversityTotalItems"
            styleClass="custom-table"
            (onLazyLoad)="_statistic.getUserFromUniversity($event)"
            [lazy]="true"
            [rows]="10"
            [paginator]="true"
            [tableStyle]="{ 'min-width': '50rem' }"
        >
            <ng-template pTemplate="caption">
                <div class="w-full flex justify-between">
                    <p class="mb-6 font-[800] text-[32px]">
                        {{ 'University' | transloco }}
                    </p>
                    <div class="flex gap-6">
                        <p-iconField iconPosition="left">
                            <p-inputIcon styleClass="pi pi-search" />
                            <input
                                type="text"
                                pInputText
                                [placeholder]="'name' | transloco"
                                (input)="dt.filter($event.target.value, 'name')"
                            />
                        </p-iconField>
                        <p-iconField iconPosition="left">
                            <p-inputIcon styleClass="pi pi-search" />
                            <input
                                type="text"
                                pInputText
                                (input)="dt.filter($event.target.value, 'eventBoxName')"
                                [placeholder]="'eventName' | transloco"

                            />
                        </p-iconField>
                    </div>
                </div>
            </ng-template>
            <ng-template pTemplate="header">
                <tr>
                    <th>No</th>
                    <th>{{ 'name' | transloco }}</th>
                    <th>{{ 'universityName'  | transloco }}</th>
                    <th>{{ 'eventName' | transloco }}</th>
                    <th>{{ 'event.raceDistance' | transloco }}</th>
                    <th>{{ 'eventResult' | transloco }}</th>
                    <!-- <th>{{'isCheckPoint' | transloco}}</th> -->
                    <th>{{ 'Date' | transloco }}</th>
                    <!-- <th>{{'age' | transloco}}</th> -->
                    <th>{{ 'spSex' | transloco }}</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-user let-rowIndex="rowIndex">
                <tr>
                    <td class="text-[#707587] font-semibold">
                        {{ rowIndex + 1 }}
                    </td>
                    <td>{{ user.name }}</td>
                    <td>{{user.universityName}}</td>
                    <td>{{ user.eventBoxNameUZ }}</td>
                    <td class="text-[#0CAEEB]">{{ user.eventRaceDistance }}</td>
                    <td>{{ user.result }}</td>
                    <td class="text-[#0CAEEB]">
                        {{ user.date | date : 'dd.MM.yyyy' }}
                    </td>
                    <td class="text-[#707587]">
                        {{ (user.sex == 1 ? 'Men' : 'woman') | transloco }}
                    </td>
                </tr>
            </ng-template>
        </p-table>
    `,
    styleUrls: ['./table.component.scss'],
    standalone: true,
    imports: [
        TableModule,
        TranslocoModule,
        InputTextModule,
        InputIconModule,
        IconFieldModule,
        DatePipe,
        DropdownModule
    ],
})
export class UniversityTableComponent implements OnInit {

    _statistic = inject(StatisticService);

    ngOnInit() {}

}
