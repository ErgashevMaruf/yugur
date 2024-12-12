import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { SpService } from 'app/core/services/sp.service';
import {
    AccountClient,
    HttpStatusCode,
    OrganizationDTO,
    SelectItem,
    SuperAdminClient,
    UserRegistrDTO,
} from 'nswag-api-auth';
import { SpSelectItems } from '../../sps/SpSelectItems';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { PasswordStrengthValidator } from 'app/modules/auth/sign-up/password.validation';
import { SelectItemClient } from 'nswag-api-sps';
import { ConfirmPasswordValidator } from 'app/modules/auth/sign-up/confirm-password.validator';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule } from 'ngx-mask';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AlreadyhaveComponent } from 'app/shared/messages/alreadyhave/alreadyhave.component';
import { NotFoundComponent } from 'app/shared/messages/notFound/notFound.component';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { environment } from 'app/core/env/environment.prod';
import { ImageModule } from 'primeng/image';
import { MatListModule } from '@angular/material/list';
import { Roles, roles } from 'app/core/user/Roles';
import { OrganizationComponent } from '../user-form/organization/organization.component';
import { catchError, of } from 'rxjs';

@Component({
    selector: 'app-registerUser',
    templateUrl: './registerUser.component.html',
    styleUrls: ['./registerUser.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        NgClass,
        TranslocoModule,
        DropdownModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        MatIconModule,
        NgxMaskModule,
        CalendarModule,
        ButtonModule,
        ReactiveFormsModule,
        PasswordModule,
        RadioButtonModule,
        ImageModule,
        MatListModule,
    ],
})
export class RegisterUserComponent implements OnInit {
    createUser: FormGroup;
    rolesList: SelectItem[];
    countries: SelectItem[];
    district: SelectItem[] = [];
    isFromGCP = true;
    isForeign = false;
    url = environment.URL;
    organization: OrganizationDTO;
    isReadyForm = false;
    user: UserRegistrDTO;
    studentMessage: string = '';
    constructor(
        public spService: SpService,
        private fb: FormBuilder,
        private accountClient: AccountClient,
        private spClient: SelectItemClient,
        private matdialogRef: MatDialogRef<RegisterUserComponent>,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: string,
        private _superAdmin: SuperAdminClient
    ) {}
    addOrRemoveForms = [
        'passportSeria',
        'passportNumber',
        'name',
        'surname',
        'patronymic',
        'spSexId',
        'address',
        'spDistrictId',
        'spRegionId',
    ];
    active = 'oneid';
    roles = roles;

    ngOnInit() {
        this.spService.GetSpByTableName(
            SpSelectItems.Sex,
            SpSelectItems.SPRegions,
            SpSelectItems.SPDistricts,
            SpSelectItems.Nations,
            SpSelectItems.UserTypes
        );
        this.isFromGCP = true;
        this.isForeign = false;
        this.accountClient.getRoles().subscribe((x) => {
            this.rolesList = x.filter((v) => v.value != '');
        });
        this.spClient.getSelectItems('Countries').subscribe((res) => {
            this.countries = res;
        });
        this.createUser = this.fb.group(
            {
                name: [{ value: '', disabled: true }, Validators.required],
                surname: [{ value: '', disabled: true }, Validators.required],
                patronymic: [
                    { value: '', disabled: true },
                    Validators.required,
                ],
                email: ['', [Validators.required, Validators.email]],
                phoneMain: ['', Validators.required],
                birthDate: ['', Validators.required],
                userName: ['', Validators.required],
                passportSeria: ['', Validators.required],
                passportNumber: ['', Validators.required],
                password: [
                    '',
                    [Validators.required, PasswordStrengthValidator],
                ],
                spCountryId: ['182', Validators.required],
                spDistrictId: [
                    { value: '', disabled: true },
                    Validators.required,
                ],
                spRegionId: [
                    { value: '', disabled: true },
                    Validators.required,
                ],
                confirmpassword: [null],
                address: [{ value: '', disabled: true }, Validators.required],
                spSexId: ['1', Validators.required],
                spUserTypeId: ['', Validators.required],
            },
            {
                validator: ConfirmPasswordValidator(
                    'password',
                    'confirmpassword'
                ),
            }
        );
        if (this.data) {
            this.editUser();
        } else {
            this.isReadyForm = true;
        }
    }
    editUser() {
        this.accountClient.getUserById(this.data).subscribe((res) => {
            this.user = res.result;
            this.createUser.removeControl('spUserTypeId');
            this.createUser.addControl('roles', new FormControl(''));
            this.isReadyForm = true;
            let activeTab;
            if (res.result.isFromGCP) {
                activeTab = 'gsp';
            }
            if (res.result.isForeign) {
                activeTab = 'foreign';
            }
            if (!res.result.isForeign && !res.result.isFromGCP) {
                activeTab = 'passport';
            }

            this.createUser.patchValue(res.result);
            this.changeTab(activeTab, false, true);
            this.createUser.get('password').setValidators([]);
            this.createUser.get('password').setValue('');
            this.createUser.get('confirmpassword').setValue('');
            this.createUser.get('password').updateValueAndValidity();
        });
    }
    changeDistrict(event: { pointerEvent: PointerEvent; value: string }) {
        this.district = this.spService.GetDistrict.filter(
            (x) => x.rootCode == event.value
        );
    }
    saveUser() {
        let user = new UserRegistrDTO();
        user.init(this.createUser.value);
        user.isFromGCP = this.isFromGCP;
        user.isPassportUzb = this.isFromGCP;
        user.isForeign = this.isForeign;
        user.isChangePassword = false;
        user.lockoutEnabled = false;
        for (let key in user) {
            if (user[key] == null || user[key] == undefined) {
                delete user[key];
            }
        }
        this.accountClient.registerOrUpdateUser(user).subscribe((res) => {
            if (res.statusCode == HttpStatusCode.OK) {
                this.dialog.open(SuccessComponent);
                setTimeout(() => {
                    this.matdialogRef.close('ok');
                }, 3000);
            }
            if (res.statusCode == HttpStatusCode.GatewayTimeout) {
                this.dialog.open(NotFoundComponent);
            }
            if (res.statusCode == HttpStatusCode.Found) {
                this.dialog.open(AlreadyhaveComponent, {
                    data: 'user',
                });
            }
            if (res.statusCode == HttpStatusCode.NotFound) {
                this.dialog.open(AlreadyhaveComponent, {
                    data: 'email',
                });
            }
        });
    }
    saveExistingUser() {
        const user = new UserRegistrDTO(this.createUser.getRawValue());
        user.isChangePassword = user.password ? true : false;
        user.lockoutEnabled = user.roles.length == 0 ? true : false;
        if (this.organization) {
            user.organization = this.organization;
        }
        user.id = this.user.id;
        user.athletesId = this.user.athletesId;
        user.isForeign = this.isForeign;
        user.isPassportUzb = this.isFromGCP;
        user.isFromGCP = this.isFromGCP;
        this.accountClient.registerOrUpdateUser(user).subscribe((res) => {
            if (res.statusCode == HttpStatusCode.OK) {
                this.dialog.open(SuccessComponent);
                this.matdialogRef.close('ok');
            }
        });
    }
    closePopUp() {
        this.matdialogRef.close();
    }
    changeTab(tabName: string, foreign = false, isForEdit = false) {
        if (this.data && !isForEdit) {
            return;
        }
        this.active = tabName;
        this.isFromGCP = tabName == 'gsp';
        this.isForeign = tabName == 'foreign';
        this.createUser.get('spCountryId').setValue('182');
        let start;
        let end;
        if (this.isFromGCP) {
            start = 0;
            end = 1;
        } else {
            if (this.isForeign) {
                start = 2;
                end = 5;
                this.createUser.get('spCountryId').setValue('');
            } else {
                start = 2;
                end = 9;
            }
        }
        this.enableDisableFormControl(start, end);
    }
    enableDisableFormControl(start: number, end: number) {
        for (let index = 0; index < this.addOrRemoveForms.length; index++) {
            if (index >= start && index <= end) {
                this.createUser.get(this.addOrRemoveForms[index]).enable();
            } else {
                this.createUser.get(this.addOrRemoveForms[index]).disable();
            }
        }
    }
    public inputTransformFn = (value: unknown): string =>
        typeof value === 'string' ? value.toUpperCase() : String(value);

    public outputTransformFn = (
        value: string | number | null | undefined
    ): string => {
        return value ? String(value).toUpperCase() : '';
    };
    select(event) {
        let roles = this.createUser.get('roles').value;
        let index = roles.findIndex((el) => el == 'Организатор');
        let isUserStudentIndex = roles.findIndex(
            (el) => el == Roles.StudentUser
        );
        if (
            event.options[0]['_value'] == Roles.StudentUser &&
            isUserStudentIndex !== -1
        ) {
            roles.splice(isUserStudentIndex, 1);
            this.createUser.get('roles').setValue(roles);
            this._superAdmin
                .updateStudent(this.user.pinfl)
                .pipe(
                    catchError((err) => {
                        return of({
                            result: false,
                            statusCode: 201,
                        });
                    })
                )
                .subscribe((res) => {
                    if (res.result) {
                        roles.push(Roles.StudentUser);
                        this.createUser.get('roles').setValue(roles);
                    } else {
                        if (res.statusCode == 201) {
                            this.studentMessage = 'HemisError';
                        } else {
                            this.studentMessage = 'NotStudent';
                            const index = this.rolesList.findIndex(
                                (x) => x.label == 'Студент-пользователь'
                            );
                            this.rolesList.splice(index, 1);
                        }
                    }
                });
        }
        if (event.options[0]['_value'] == 'Организатор' && index !== -1) {
            roles.splice(index, 1);
            this.createUser.get('roles').setValue(roles);
            const dialog = this.dialog.open(OrganizationComponent);
            dialog.afterClosed().subscribe((res) => {
                if (res) {
                    roles.push('Организатор');
                    this.createUser.get('roles').setValue(roles);
                    this.organization = new OrganizationDTO();
                    this.organization.name = res.name;
                    this.organization.spOrganizationTypeId =
                        res.spOrganizationTypeId;
                }
            });
        } else {
            this.organization = null;
        }
    }
}
