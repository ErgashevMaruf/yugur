import { DatePipe, NgClass } from '@angular/common';
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    inject,
} from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { IconsModule } from 'app/core/icons/icons.module';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { StatisticService } from '../statistic.service';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { RegistationEventClient, UniversityDTO } from 'nswag-api-marathon';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-universitetes-table',
    template: `
        <p-table
            #dt
            [value]="_statistic.universitetes"
            [totalRecords]="_statistic.universitetesTotalItems"
            styleClass="custom-table"
            (onLazyLoad)="_statistic.getUniversitetes($event)"
            [lazy]="true"
            [rows]="10"
            [paginator]="true"
            [tableStyle]="{ 'min-width': '50rem' }"
        >
            <ng-template pTemplate="caption">
                <div class="w-full flex justify-between">
                    <p class="mb-6 font-[800] text-[32px]">
                        {{ 'UniversitesInfo' | transloco }}
                    </p>
                    <div class="flex gap-6">
                        <p-dropdown
                            [options]="universities"
                            styleClass="w-[250px]"
                            panelStyleClass="w-[250px]"
                            optionLabel="universityName"
                            optionValue="universityCode"
                            [placeholder]="'chooseUniversity' | transloco"
                            (onChange)="
                                dt.filter($event.value, 'universityCode')
                            "
                            [showClear]="true"
                        >
                            <ng-template let-item pTemplate="item">
                                <p pTooltip="{{ item.universityName }}">
                                    {{ item.universityName }}
                                </p>
                            </ng-template>
                        </p-dropdown>
                    </div>
                </div>
            </ng-template>
            <ng-template pTemplate="header">
                <tr>
                    <th>No</th>
                    <th>{{ 'universityName' | transloco }}</th>
                    <th>{{ 'totalAthletes' | transloco }}</th>
                    <th>{{ 'mens' | transloco }}</th>
                    <th>{{ 'womens' | transloco }}</th>
                    <th class="text-center">{{ 'seeCourses' | transloco }}</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-user let-rowIndex="rowIndex">
                <tr>
                    <td class="text-[#707587] font-semibold">
                        {{ rowIndex + 1 }}
                    </td>
                    <td>{{ user.universityName }}</td>
                    <td>{{ user.totalAthletesCount }}</td>
                    <td>{{ user.malesCount }}</td>
                    <td>{{ user.femalesCount }}</td>
                    @for (course of user.courses; track course) {
                    <td class="text-[#0CAEEB]">{{ course.count }}</td>
                    }
                    <td class="text-center cursor-pointer">
                        <i
                            class="pi iconSize icon pi-angle-down"
                            [ngClass]="showIndex == rowIndex ? 'open' : 'close'"
                            (click)="showIndex = rowIndex"
                        ></i>
                    </td>
                </tr>
                @if (showIndex == rowIndex) {
                <tr>
                    <td colspan="8" class="p-0">
                        <div
                            class="flex py-4 gap-4 font-medium text-[14px] bg-main flex-wrap text-white"
                        >
                            @for (x of user.totalAthletesCountByCourses; track
                            x) {
                            <div
                                class="w-[160px] py-4 flex cursor-pointer
                                 hover:scale-125 flex-col justify-center items-center
                                  rounded-[10px] border font-semibold text-grey600To200 border-grey100To800"
                            >
                                <p>{{ x.courseCode }}</p>
                                <p>{{ x.totalAthletesCount }}</p>
                            </div>
                            }
                        </div>
                    </td>
                </tr>
                }
            </ng-template>
        </p-table>
    `,
    styleUrls: ['./universitetes-table.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        TableModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TranslocoModule,
        ButtonModule,
        DropdownModule,
        TooltipModule,
        NgClass,
    ],
})
export class UniversitetesTableComponent implements OnInit {
    _statistic = inject(StatisticService);
    showIndex: number;
    _registrationEvent = inject(RegistationEventClient);
    universities: UniversityDTO[];
    ngOnInit() {
        this._registrationEvent
            .getUniversitiesFromRegistrationEvents()
            .subscribe((res) => {
                this.universities = res.result;
            });
    }
}
