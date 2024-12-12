import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableMetaData } from 'nswag-api/nswag-api-auth';
import {
    AthleteEventDto,
    EventBoxDTO,
    EventClient,
    EventDTO,
    RegistationEventClient,
    RegistationEventDTO,
    SelectRegistationEventDTO,
    SuperAdminClient,
} from 'nswag-api/nswag-api-marathon';
import { SelectItemClient } from 'nswag-api/nswag-api-sps';
import { Table } from 'primeng/table';
import { combineLatest, Subscription } from 'rxjs';
import { SpSelectItems } from '../../sps/SpSelectItems';
import { MatDialog } from '@angular/material/dialog';
import { WarningComponent } from 'app/shared/messages/warning/warning.component';
import { ChangeBibComponent } from './changeBib/changeBib.component';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { UserService } from 'app/core/user/user.service';
import { GiveNumberComponent } from './giveNumber/giveNumber.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslocoService } from '@ngneat/transloco';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-exportByEvent',
    templateUrl: './exportByEvent.component.html',
    styleUrls: ['./exportByEvent.component.css'],
    providers: [MessageService, ConfirmationService],
})
export class ExportByEventComponent implements OnInit {
    event: EventBoxDTO;
    activeEvent: EventDTO;
    tableFilter: TableMetaData = {} as TableMetaData;
    users: RegistationEventDTO[];
    totalItems: number;
    fullName: string;
    pinfl: string;
    gender: number;
    universityname: string;
    phonemain: string;
    orgname: string;
    ahtletesId: number;
    orgtype: string;
    email: string;
    bibcode: string;
    spSex: any;
    organization: any;
    organizationTypeMap = new Map<number, string>();
    selectedData: RegistationEventDTO[] = [];
    selectAll = false;
    isGetNumber$: Subscription;
    show = false;
    allElements: RegistationEventDTO[];
    loading = false;

    constructor(
        private eventClient: EventClient,
        private router: ActivatedRoute,
        private registrationEventClient: RegistationEventClient,
        private spService: SelectItemClient,
        private dialog: MatDialog,
        private _superAdmin: SuperAdminClient,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private _transloco: TranslocoService,
        private _httpClient: HttpClient
    ) {}
    public user$ = inject(UserService);

    ngOnInit() {
        let id = this.router.snapshot.paramMap.get('id');
        this.getEventBox(id);
        combineLatest([
            this.spService.getSelectItems(SpSelectItems.Sex),
            this.spService.getSelectItems('OrganizationType'),
        ]).subscribe((res) => {
            this.spSex = res[0];
            this.organization = res[1];
            this.organization.forEach((element) => {
                this.organizationTypeMap.set(+element.value, element.label);
            });
        });
    }

    getEventBox(id: string) {
        this.eventClient.eventBoxById(+id).subscribe((res) => {
            this.event = res.result;
            this.activeEvent = this.event.events[0];
            this.show = true;
        });
    }

    loadUser(event) {
        for (const [key, value] of Object.entries(event.filters)) {
            if (event.filters[key].value == null) {
                delete event.filters[key];
            }
        }
        this.tableFilter = Object.assign(this.tableFilter, event);
        this.tableFilter.filters = JSON.stringify(this.tableFilter.filters);
        this.registrationEventClient
            .getAllRegisteredEventByEvenId(
                this.activeEvent.id,
                this.tableFilter
            )
            .subscribe((res) => {
                this.users = res.result.items;
                this.totalItems = res.result.totalItems;
                this.selectAll = res.result.allCheckedVerified;
            });
    }

    changeEvent(x: EventDTO) {
        this.activeEvent = x;
        this.loadUser(
            new TableMetaData({
                first: 0,
                rows: 10,
                sortOrder: 0,
                filters: '',
            })
        );
    }

    clear(table: Table) {
        this.fullName = '';
        this.universityname = null;
        this.pinfl = null;
        this.phonemain = null;
        this.gender = null;
        this.email = '';
        this.orgname = '';
        this.orgtype = null;
        this.bibcode = null;
        this.ahtletesId = null;
        table.clear();
    }

    exportToExcell() {
        this.registrationEventClient
            .exportRegisteredEventByEventId(
                this.activeEvent.id,
                this.tableFilter
            )
            .subscribe((res) => {
                let a = document.createElement('a');
                a.download = `${
                    this.event.nameUZ + ' ' + this.activeEvent.raceDistanceUZ
                }.xlsx`;
                var blob = new Blob([res.data], {
                    type: 'application/octet-stream',
                });
                a.href = window.URL.createObjectURL(blob);
                a.click();
            });
    }

    onSelectionChange(value = []) {
        this.selectAll = value.length === this.totalItems;
        this.selectedData = value;
        this.changeStateNumber(value, true);
    }

    onSelectAllChange(event: any) {
        const checked = event.checked;
        let text = checked ? 'areYouSureSelectAll' : 'areYouSureNotChoosingAll';
        const dialog = this.dialog.open(WarningComponent, {
            data: text,
        });
        dialog.afterClosed().subscribe((res) => {
            if (res == 'yes') {
                this.tableFilter.rows = this.totalItems;
                this.registrationEventClient
                    .getAllRegisteredEventByEvenId(
                        this.activeEvent.id,
                        this.tableFilter
                    )
                    .subscribe((res) => {
                        this.selectAll = checked;
                        if (checked) {
                            this.selectedData = res.result.items;
                            this.changeStateNumber(
                                res.result.items,
                                true,
                                true
                            );
                        } else {
                            this.selectedData = [];
                            this.changeStateNumber(
                                res.result.items,
                                false,
                                true
                            );
                        }
                    });
            }
        });
    }

    giveNumber(user: RegistationEventDTO, index: number) {
        if (!user.isGivenNumber) {
            const dialog = this.dialog.open(GiveNumberComponent, {
                data: {
                    user: user,
                },
            });
            dialog.afterClosed().subscribe((res) => {
                if (res == 'ok') {
                    user.isGivenNumber = true;
                }
            });
        } else {
            this.confirm(user);
        }
    }

    confirm(user: RegistationEventDTO) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: this._transloco.translate('areYouSureTakeNumber'),
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            acceptLabel: this._transloco.translate('YES'),
            rejectLabel: this._transloco.translate('NO'),
            accept: () => {
                const numberGiveDTO = new SelectRegistationEventDTO();
                numberGiveDTO.athletesId = user.athletesId;
                numberGiveDTO.eventId = user.eventId;
                this.registrationEventClient
                    .isGivenNumberRegistationEvent([numberGiveDTO], false)
                    .subscribe((res) => {
                        this.messageService.add({
                            severity: 'info',
                            summary: this._transloco.translate('Confirmed'),
                            detail: this._transloco.translate('numberTaken'),
                        });
                        user.isGivenNumber = false;
                    });
            },
        });
    }

    changeState(athlete: RegistationEventDTO) {
        this.changeStateNumber([athlete], false);
    }

    changeStateNumber(
        selectedData: SelectRegistationEventDTO[],
        state: boolean,
        isAll = false
    ) {
        let arr = [];
        selectedData.forEach((el) => {
            arr.push(
                new SelectRegistationEventDTO({
                    eventId: el.eventId,
                    athletesId: el.athletesId,
                })
            );
        });
        this.registrationEventClient
            .isGivenNumberRegistationEvent(arr, state)
            .subscribe((res) => {
                if (isAll && !state) {
                    this.users.forEach((el) => (el.isGivenNumber = false));
                }
            });
    }

    openBibCodeChangeMenu(athlete: RegistationEventDTO) {
        const dialog = this.dialog.open(ChangeBibComponent, {
            data: { athlete: athlete },
        });
        dialog.afterClosed().subscribe((res) => {
            if (res == 'ok') {
                this.dialog.open(SuccessComponent);
                this.loadUser(
                    new TableMetaData({
                        first: 0,
                        rows: 10,
                        filters: '{}',
                        sortOrder: 0,
                    })
                );
            }
        });
    }

    deleteUser(athlete) {
        this._superAdmin
            .deleteOnRegistrationEvent(
                new AthleteEventDto({
                    eventId: athlete.eventId,
                    athleteId: athlete.athletesId,
                })
            )
            .subscribe((res) => {
                this.loadUser(
                    new TableMetaData({
                        first: 0,
                        rows: 10,
                        sortOrder: 0,
                        filters: '',
                    })
                );
            });
    }
}
