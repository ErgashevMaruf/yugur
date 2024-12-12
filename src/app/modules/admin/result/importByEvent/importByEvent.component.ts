import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { FileServiceService } from 'app/modules/services/fileUpload.service';
import { ErrorComponent } from 'app/shared/messages/error/error.component';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { SwaggerException, TableMetaData } from 'nswag-api-auth';
import {
    EventBoxDTO,
    EventClient,
    ResultClient,
    PublishResultClient,
    PublishResultDTO,
    AllResultDTO,
    ResponseModelOfPublishResultDTO,
    EventDTO,
    PublishFilterFormulaDTO,
} from 'nswag-api-marathon';
import { Table } from 'primeng/table';
import { AddFiltersComponent } from './addFilters/addFilters.component';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-importByEvent',
    templateUrl: './importByEvent.component.html',
    styleUrls: ['./importByEvent.component.css'],
})
export class ImportByEventComponent implements OnInit {
    hrefElement: any;
    eventBox: EventBoxDTO;
    event: EventDTO;
    activeIndex = 0;
    tableFilter: TableMetaData = {} as TableMetaData;
    users: AllResultDTO[] = [];
    totalItems: number;
    fullname: string;
    position: string;
    bibcode: string;
    publishRowId: number;
    isSuperAdmin = false;
    isSowProperty = false;
    disableSelectRows = true;
    publishForm = this.fb.group({
        isRankOverall: [false],
        isBibCode: [false],
        isRaceDistance: [false],
        isName: [false],
        isSurname: [false],
        isPatronymic: [false],
        isSpSexId: [false],
        isBirthDate: [false],
        isAge: [false],
        isCategory: [false],
        isGroup: [false],
        isCountry: [false],
        isRegion: [false],
        isOrganizationName: [false],
        isOrganizationType: [false],
        isUniversityName: [false],
        isCourse:[false],
        isTeacherOTM:[false],
        isCheckPoint: [false],
        isGunTime: [false],
        isChipTime: [false],
        active: [false],
    });
    formula: PublishFilterFormulaDTO[];

    visible = false;

    constructor(
        private eventClient: EventClient,
        private router: ActivatedRoute,
        private resultClient: ResultClient,
        private publishResultClient: PublishResultClient,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private fileService: FileServiceService,
        private userService: UserService
    ) {}

    ngOnInit() {
        let id = this.router.snapshot.paramMap.get('id');
        this.getEventBox(id);
        this.userService.isAdmin$.subscribe((res) => {
            this.isSuperAdmin = res;
        });
    }

    getEventBox(id: string) {
        this.eventClient.eventBoxById(+id).subscribe((res) => {
            this.eventBox = res.result;
            this.event = this.eventBox.events[0];
            this.publishResult();
        });
    }

    publishResult() {
        this.getFilterFormula();
        if (this.event.isResult || this.event.isPublishFilterFormula) {
            this.activeIndex = this.event.isPublishFilterFormula ? 1 : 0;
            this.disableSelectRows = !this.event.isPublishFilterFormula;
            this.publishResultClient
                .publishResultById(this.event.id)
                .subscribe((resultField) => {
                    this.publishRowId = resultField.result.id;
                    this.publishForm.patchValue(resultField.result);
                    this.isSowProperty = true;
                });
        }
    }

    loadUser(event) {
        for (const [key, value] of Object.entries(event.filters)) {
            if (event.filters[key].value == null) {
                delete event.filters[key];
            }
        }
        this.tableFilter = Object.assign(this.tableFilter, event);
        this.tableFilter.filters = JSON.stringify(this.tableFilter.filters);
        this.resultClient
            .getAllResult(this.event.id, this.tableFilter)
            .subscribe((res) => {
                for (let x of res.result.items) {
                    delete x['event'];
                    delete x['checkPoints'];
                    delete x['active'];
                }
                this.users = res.result.items;
                this.totalItems = res.result.totalItems;
            });
    }

    changeEvent(event: EventDTO) {
        this.event = event;
        this.isSowProperty = false;
        this.publishResult();
    }

    clear(table: Table) {
        this.fullname = '';
        this.position = '';
        this.bibcode = '';
        table.clear();
    }

    originalOrder = (
        a: KeyValue<number, string>,
        b: KeyValue<number, string>
    ): number => {
        return 0;
    };

    saveVisibleUi() {
        let publishDTO = new PublishResultDTO();
        publishDTO.init(this.publishForm.value);
        publishDTO.eventId = this.event.id;
        if (!this.publishRowId) {
            this.publishResultClient
                .addPublishResult(publishDTO)
                .subscribe((res) => {
                    this.openSuccess('savedPublish');
                });
        } else {
            publishDTO.id = this.publishRowId;
            this.publishResultClient
                .updatePublishResult(publishDTO)
                .subscribe((res) => {
                    this.openSuccess('updatePublish');
                });
        }
    }

    openSuccess(text: string) {
        this.dialog.open(SuccessComponent, {
            data: text,
        });
    }

    importExcell(file: File[], update = false) {
        this.fileService
            .uploadResult(file[0], this.event.id)
            .pipe(
                catchError((err) => {
                    this.dialog.open(ErrorComponent, {
                        data: 'checkExcell',
                    });
                    return of(false);
                })
            )
            .subscribe((res) => {
                if (res.size < 50) {
                    this.isSowProperty = true
                    return;
                }
                this.visible = true;
                this.hrefElement = document.createElement('a');
                this.hrefElement.download = 'Xatolikchiqqanlar.xlsx';
                var blob = new Blob([res], {
                    type: 'application/octet-stream',
                });
                this.hrefElement.href = window.URL.createObjectURL(blob);
            });
    }

    getFilterFormula() {
        this.publishResultClient
            .getAllPublishFilterFormulaView(
                this.event.id,
                new TableMetaData({
                    first: 0,
                    rows: 100,
                    filters: '{}',
                    sortOrder: 0,
                })
            )
            .subscribe({
                next: (value) => {
                    this.formula = value.result.items;
                },
                error: (err) => {
                    this.dialog.open(ErrorComponent, {
                        data: 'getFilterFormula',
                    });
                },
            });
    }

    createPublishForm(res: ResponseModelOfPublishResultDTO) {
        let fb = this.fb.group({});
        delete res.result.id;
        delete res.result.eventId;
        for (let [key, value] of Object.entries(res.result)) {
            fb.addControl(key, new FormControl(value));
        }
        return fb;
    }

    openFilter(formula: PublishFilterFormulaDTO) {
        const dialogRef = this.dialog.open(AddFiltersComponent, {
            data: {
                eventId: this.event.id,
                publishFormula: formula,
            },
        });
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.disableSelectRows = false;
                this.loadUser(
                    new TableMetaData({
                        first: 0,
                        rows: 10,
                        sortOrder: 0,
                        filters: '',
                    })
                );
                this.getFilterFormula();
            }
        });
    }
}
