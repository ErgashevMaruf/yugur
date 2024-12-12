import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import {
    AthletesClient,
    AthletesDTO,
    HttpStatusCode,
    OrganizationDTO,
} from 'nswag-api-marathon';
import * as XLSX from 'xlsx';
import { SpSelectItems } from '../sps/SpSelectItems';
import { SelectItem, SelectItemClient, TableMetaData } from 'nswag-api-sps';
import { catchError, combineLatest, throwError } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { UserService } from 'app/core/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserEventComponent } from './addUserEvent/addUserEvent.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorComponent } from 'app/shared/messages/error/error.component';
import { WarningComponent } from 'app/shared/messages/warning/warning.component';
import { ActivatedRoute } from '@angular/router';

export interface addUser {
    Name: string;
    Surname: string;
    Patronymic: string;
    PINFL: string;
    BirthDate: string;
    SpSexId: string;
    Region: string;
    PhoneMain: string;
    EMail: string;
}

export interface country {
    label: string;
    value: number;
}

@Component({
    selector: 'app-listathletes',
    templateUrl: './listathletes.component.html',
    styleUrls: ['./listathletes.component.css'],
})
export class ListathletesComponent implements OnInit {
    regions: SelectItem[];
    spSex: SelectItem[];
    selectRegion: string;
    selectSpSex: string;
    userTable: FormArray;
    excell: unknown[];
    athletes: AthletesDTO[];
    country: string;
    othercountry: string;
    organization: SelectItem[];
    isFilterShow: boolean;
    role: string;

    constructor(
        private athletesClient: AthletesClient,
        private fb: FormBuilder,
        private spService: SelectItemClient,
        private translocoService: TranslocoService,
        private userService: UserService,
        private matdialog: MatDialog,
        private _router: ActivatedRoute
    ) {
        this.role = userService.userInfo.mainRole;
    }
    @ViewChild('putthere') child: ElementRef;

    filterForm = this.fb.group({
        name: [''],
        surname: [''],
        organizationName: [''],
        selectOrgType: [],
    });

    tableFilter: TableMetaData = {} as TableMetaData;

    totalItems: number;

    controlState = false;

    isUzbekistan = true;

    isCreate = true;

    show = false;

    oneTimeWorkRouterParam = false;

    selectOrganization: number;

    orgId: number;

    editableUser: AthletesDTO;

    contRolFb = this.fb.group({
        userTables: this.fb.array([]),
    });

    selectFilter = '';

    chooseCountry: country[];

    ngOnInit() {
        combineLatest([
            this.spService.getSelectItems(SpSelectItems.Sex),
            this.spService.getSelectItems(SpSelectItems.SPRegions),
            this.spService.getSelectItems('OrganizationType'),
        ]).subscribe((res) => {
            this.regions = res[1];
            this.spSex = res[0];
            this.organization = res[2];
        });
        this.spService.getSelectItems(SpSelectItems.Countries).subscribe();
        this.userTable = this.contRolFb.get('userTables') as FormArray;
        let activeLang = this.translocoService.getActiveLang();
        this.country =
            activeLang == 'ru-Ru'
                ? 'Узбекистан'
                : activeLang == 'en'
                ? 'Uzbekistan'
                : "O'zbekiston";
        this.othercountry =
            activeLang == 'ru-Ru'
                ? 'Други'
                : activeLang == 'en'
                ? 'Others'
                : 'Boshqa';
        this.chooseCountry = [
            {
                label: this.country,
                value: 182,
            },
            {
                label: this.othercountry,
                value: 3000,
            },
        ];
        this.filterForm.valueChanges.subscribe((res) => {
            if (
                res.name ||
                res.surname ||
                res.organizationName ||
                res.selectOrgType
            ) {
                this.isFilterShow = true;
            } else {
                this.isFilterShow = false;
            }
        });
        this._router.queryParams.subscribe((res) => {
            if (res.name) {
                this.filterForm.get('organizationName').setValue(res.name);
                this.oneTimeWorkRouterParam = true;
            }
            this.show = true;
        });
    }
    loadAthletes(event) {
        this.tableFilter = Object.assign(this.tableFilter, event);
        this.tableFilter.filters = JSON.stringify(this.tableFilter.filters);
        if (this.oneTimeWorkRouterParam) {
            this.tableFilter.filters = JSON.stringify({
                orgname: {
                    value: this.filterForm.value.organizationName,
                },
            });
            this.oneTimeWorkRouterParam = false;
        }
        this.athletesClient
            .getAllAthletes(this.tableFilter)
            .subscribe((res) => {
                this.athletes = res.result.items;
                this.totalItems = res.result.totalItems;
            });
    }
    genderLabel(value) {
        if (this.spSex && value) {
            let spLabel = this.spSex.find((el) => +el.value == +value);
            if (spLabel) {
                return spLabel.label;
            } else {
                return '';
            }
        }
        return '';
    }
    getOrganizationType(organization: OrganizationDTO) {
        if (this.organization && organization) {
            return this.organization.find(
                (el) => +el.value == +organization.spOrganizationTypeId
            ).label;
        }
    }
    region(value) {
        if (this.regions && value) {
            let regionLabel = this.regions.find((el) => +el.value == +value);
            if (regionLabel) {
                return regionLabel.label;
            } else {
                return '';
            }
        }
        return '';
    }
    openEditPanel(x) {
        this.editableUser = x;
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        x.spSexId = x.spSexId + '';
        x.spRegionId = x.spRegionId + '';
        this.cleanFormArr();
        this.userTable.push(this.createFormArr());
        this.userTable.controls[0].patchValue(x);
        this.controlState = true;
        this.isCreate = false;
    }
    uploadExample() {
        this.athletesClient
            .exportExcelTemplatesForAthletes()
            .subscribe((res) => {
                let a = document.createElement('a');
                a.download = 'file.xlsx';
                var blob = new Blob([res.data], {
                    type: 'application/octet-stream',
                });
                a.href = window.URL.createObjectURL(blob);
                a.click();
            });
    }
    checkExcell(event) {
        let file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(file);
        fileReader.onload = (e) => {
            var workBook = XLSX.read(fileReader.result, { type: 'binary' });
            var sheetNames = workBook.SheetNames;
            this.excell = XLSX.utils.sheet_to_json(
                workBook.Sheets[sheetNames[0]],
                { raw: false }
            );
            for (let x of this.excell) {
                if (x['Country']) {
                    let country = this.chooseCountry.find(
                        (el) => el.label == x['Country'].trim()
                    );
                    x['Country'] = '';
                    if (country) {
                        x['Country'] = country.value;
                    }
                }
                if (x['Region']) {
                    let region = this.regions.find(
                        (el) => el.label == x['Region'].trim()
                    );
                    x['Region'] = '';
                    if (region && x['Country'] == 182) {
                        x['Region'] = region.value;
                    }
                }
                if (x['Gender']) {
                    let gender = this.spSex.find(
                        (el) => el.label == x['Gender'].trim()
                    );
                    x['Gender'] = '';
                    if (gender) {
                        x['Gender'] = gender.value;
                    }
                }

                if (x['BirthDate']) {
                    let regExp = new RegExp(
                        /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/g
                    );
                    x['BirthDate'] = regExp.test(x['BirthDate'])
                        ? x['BirthDate']
                        : '';
                }
                this.userTable.push(this.createFormArr(x));
            }
            this.controlState = true;
        };
    }
    createFormArr(x = null) {
        let formgroup = this.fb.group({
            name: [x ? x.Name : '', [Validators.required]],
            surname: [x ? x.Surname : '', [Validators.required]],
            patronymic: [x ? x.Patronymic : '', [Validators.required]],
            birthDate: [x ? x.BirthDate : '', Validators.required],
            spSexId: [x ? +x.Gender : '', Validators.required],
            spCountryId: [x ? +x.Country : '', Validators.required],
            spRegionId: [x ? +x.Region : '', Validators.required],
            phoneMain: [x ? x.PhoneMain : '', [Validators.required]],
            eMail: [
                x ? x.EMail : '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(
                        '^[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\\.[a-z]{2,4}$'
                    ),
                ],
            ],
        });
        if (+x?.Country !== 182) {
            formgroup.get('spRegionId').setValidators([]);
            formgroup.get('spRegionId').updateValueAndValidity();
        }
        return formgroup;
    }
    addUserFromExcell() {
        this.userTable.push(this.createFormArr());
    }
    checkValidOrNot(index, controlName) {
        return (
            this.userTable.controls[index].get(controlName).errors &&
            (this.userTable.controls[index].get(controlName).value ||
                this.userTable.controls[index].get(controlName).dirty)
        );
    }
    addUser() {
        this.userTable.push(this.createFormArr());
        this.controlState = true;
    }
    delete(i: number) {
        this.userTable.controls.splice(i, 1);
    }
    sendToServer() {
        let user = this.userTable.value;
        for (let x of user) {
            if (x['spCountryId'] !== 182) {
                delete x['spRegionId'];
            }
        }
        if (!this.isCreate) {
            user[0].id = this.editableUser.id;
            user[0].oragnization = this.editableUser.organization;
            this.athletesClient.onUpdate(user[0]).subscribe((res) => {
                this.cleanFormArr();
                this.controlState = false;
                this.isCreate = true;
                let index = this.athletes.findIndex(
                    (el) => el.id == user[0].id
                );
                if (index !== -1) {
                    this.athletes[index] = user[0];
                }
            });
            return;
        }
        this.athletesClient
            .uploadExcelFromAthletes(user)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let data = '';
                    if (error.status == HttpStatusCode.NotFound) {
                        data = 'organizationNotFound';
                    } else if (error.status == HttpStatusCode.Forbidden) {
                        data = 'Pinflexist';
                    } else if (error.status == HttpStatusCode.BadRequest) {
                        data = 'emailAlreadyExist';
                    }
                    this.matdialog.open(ErrorComponent, {
                        data: data,
                    });
                    return throwError(() => error);
                })
            )
            .subscribe((res) => {
                this.loadAthletes(
                    new TableMetaData({
                        first: 0,
                        rows: 10,
                        filters: '',
                        sortOrder: 0,
                    })
                );
                this.cleanFormArr();
                this.controlState = false;
            });
    }
    cleanFormArr() {
        for (let x in this.userTable) {
            this.userTable.removeAt(0);
        }
    }
    setValidatorsRegion(event, i: number) {
        if (event == 182) {
            this.userTable.controls[i]
                .get('spRegionId')
                .setValidators([Validators.required]);
        } else {
            this.userTable.controls[i].get('spRegionId').setValidators([]);
            this.userTable.controls[i].get('spRegionId').setValue(null);
        }
        this.userTable.controls[i].get('spRegionId').updateValueAndValidity();
    }
    closeForm() {
        this.cleanFormArr();
        this.controlState = false;
        this.isCreate = true;
    }
    filterClean() {
        this.selectFilter = '';
        this.filterForm.get('name').setValue('');
        this.filterForm.get('surname').setValue('');
        this.filterForm.get('organizationName').setValue('');
        this.filterForm.get('selectOrgType').setValue('');
        this.loadAthletes(
            new TableMetaData({
                first: 0,
                rows: 20,
                filters: '',
                sortOrder: 0,
            })
        );
    }
    exportToExcell() {
        let orgId = null;
        if (this.filterForm.get('organizationName').value) {
            orgId = this.athletes[0].organization.id
            return;
        }
        this.athletesClient
            .exportExcelAthletes(orgId)
            .subscribe((res) => {
                this.downloadFileFromServer(res);
            });
    }
    downloadFileFromServer(res) {
        let a = document.createElement('a');
        a.download = 'file.xlsx';
        var blob = new Blob([res.data], {
            type: 'application/octet-stream',
        });
        a.href = window.URL.createObjectURL(blob);
        a.click();
    }
    openAddEvent(id) {
        this.matdialog.open(AddUserEventComponent, {
            data: id,
            disableClose: true,
        });
    }
    deleteUser(id: number) {
        const dialog = this.matdialog.open(WarningComponent);
        dialog.afterClosed().subscribe((res) => {
            if (res == 'yes') {
                this.athletesClient
                    .onDelete(id)
                    .pipe(
                        catchError((error: HttpErrorResponse) => {
                            let data = '';
                            if (error.status == HttpStatusCode.BadRequest) {
                                data = 'thisAthletesHaveAccount';
                            }
                            this.matdialog.open(ErrorComponent, {
                                data: data,
                            });
                            return throwError(() => error);
                        })
                    )
                    .subscribe((res) => {
                        let index = this.athletes.findIndex(
                            (el) => el.id == id
                        );
                        this.athletes.splice(index, 1);
                    });
            }
        });
    }
}
