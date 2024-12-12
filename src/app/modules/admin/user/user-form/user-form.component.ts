import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { SpService } from 'app/core/services/sp.service';
import {
    AccountClient,
    HttpStatusCode,
    OrganizationDTO,
    SelectItem,
    SuperAdminClient,
    UserRegistrDTO,
} from 'nswag-api-auth';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { SelectItemClient } from 'nswag-api-sps';
import { catchError, combineLatest, of } from 'rxjs';
import { PasswordStrengthValidator } from 'app/modules/auth/sign-up/password.validation';
import { ConfirmPasswordValidator } from 'app/modules/auth/sign-up/confirm-password.validator';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { OrganizationComponent } from './organization/organization.component';
import { Roles, roles } from 'app/core/user/Roles';
import { environment } from 'app/core/env/environment.prod';
@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UserFormComponent implements OnInit {
    rolesList: SelectItem[] = [];
    userEditForm: FormGroup;
    create = false;
    user: UserRegistrDTO;
    countries: SelectItem[];
    regions: SelectItem[];
    districts: SelectItem[];
    setPassword: FormGroup;
    activeCountry: string;
    activeDistrict = '';
    activeRegion = '';
    regionsDistricts: SelectItem[];
    organization: OrganizationDTO;
    studentMessage: string;
    organizationForm: FormGroup = this.fb.group({
        name: [],
    });
    roles = roles;
    organizationTypes: SelectItem[];
    url = environment.URL;
    constructor(
        private accountClient: AccountClient,
        public spService: SpService,
        @Inject(MAT_DIALOG_DATA) public data: string,
        private selectItemsClient: SelectItemClient,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private matdialog: MatDialogRef<UserFormComponent>,
        private _superAdmin: SuperAdminClient
    ) {}

    ngOnInit() {
        this.selectItemsClient
            .getSelectItems('OrganizationType')
            .subscribe((res) => {
                this.organizationTypes = res;
            });

        this.setPassword = this.fb.group(
            {
                password: ['', PasswordStrengthValidator],
                confirmpassword: [''],
            },
            {
                validator: ConfirmPasswordValidator(
                    'password',
                    'confirmpassword'
                ),
            }
        );
        this.accountClient.getRoles().subscribe((x) => {
            this.rolesList = x.filter((v) => v.value != '');
        });
        this.accountClient.getUserById(this.data).subscribe((res) => {
            if (res.result.organization) {
                this.organizationForm = this.fb.group({
                    spOrganizationTypeId: ['', Validators.required],
                    name: ['', Validators.required],
                    id: ['', Validators.required],
                });
                this.organizationForm
                    .get('name')
                    .setValue(res.result.organization.name);
                this.organizationForm
                    .get('id')
                    .setValue(res.result.organization.id);
                this.organizationForm
                    .get('spOrganizationTypeId')
                    .setValue(
                        res.result.organization.spOrganizationTypeId + ''
                    );
            }
            this.user = res.result;
            this.userEditForm = this.createFormGroup(res.result);
            this.checkFormControl();
            this.selectItemsClient
                .getSelectItems('Countries')
                .subscribe((countries) => {
                    this.countries = countries;
                    this.userEditForm
                        .get('spCountryId')
                        .setValue(this.user.spCountryId + '');
                    if (!res.result.isForeign) {
                        this.userEditForm.get('spCountryId').setValue('182');
                        combineLatest([
                            this.selectItemsClient.getSelectItems('Regions'),
                            this.selectItemsClient.getSelectItems('Districts'),
                        ]).subscribe((res) => {
                            this.regions = res[0];
                            this.districts = res[1];
                            if (this.user.spRegionId) {
                                this.userEditForm
                                    .get('spRegionId')
                                    .setValue(this.user.spRegionId + '');
                                if (this.user.spDistrictId) {
                                    this.userEditForm
                                        .get('spDistrictId')
                                        .setValue(this.user.spDistrictId + '');
                                }
                                this.changeDistrict(+this.user.spRegionId);
                            }
                        });
                    }
                });

            this.create = true;
        });
    }
    createFormGroup(obj: UserRegistrDTO) {
        let formGroupObj: any = {};
        for (const key in obj) {
            if (
                key == 'spRegionId' ||
                key == 'spDistrictId' ||
                key == 'spCountryId' ||
                key == 'address' ||
                key == 'patronymic' ||
                key == 'roles'
            ) {
                formGroupObj[key] = new FormControl(obj[key]);
                continue;
            }
            if (obj[key] == false || obj[key]) {
                formGroupObj[key] = new FormControl(
                    obj[key],
                    Validators.required
                );
            }
        }
        return new FormGroup(formGroupObj);
    }
    checkFormControl() {
        if (this.user.isForeign) {
            this.userEditForm.removeControl('spDistrictId');
            this.userEditForm.removeControl('spRegionId');
            this.userEditForm.removeControl('address');
        }
    }
    changeDistrict(rootCode: number) {
        this.regionsDistricts = this.districts.filter(
            (x) => +x.rootCode == rootCode
        );
    }

    editUser() {
        let userRegistDTO = new UserRegistrDTO(this.userEditForm.value);
        userRegistDTO.password = '';
        if (this.setPassword.get('password').value) {
            userRegistDTO.password = this.setPassword.get('password').value;
            userRegistDTO.isChangePassword = true;
        }
        if (this.organization) {
            userRegistDTO.organization = this.organization;
        }
        if (this.organizationForm.get('name').value) {
            let organization = new OrganizationDTO(this.organizationForm.value);
            userRegistDTO.organization = organization;
        }
        userRegistDTO.lockoutEnabled =
            userRegistDTO.roles.length == 0 ? true : false;

        this.accountClient
            .registerOrUpdateUser(userRegistDTO)
            .subscribe((res) => {
                if (res.statusCode == HttpStatusCode.OK) {
                    this.dialog.open(SuccessComponent);
                    this.matdialog.close('ok');
                }
            });
    }
    select(event) {
        let roles = this.userEditForm.get('roles').value;
        let index = roles.findIndex((el) => el == 'Организатор');
        let isUserStudentIndex = roles.findIndex(
            (el) => el == Roles.StudentUser
        );
        if (isUserStudentIndex !== -1) {
            roles.splice(isUserStudentIndex, 1);
            this.userEditForm.get('roles').setValue(roles);
            this._superAdmin
                .updateStudent(this.user.pinfl)
                .pipe(
                    catchError((err) => {
                        return of(false);
                    })
                )
                .subscribe((res) => {
                    if (res) {
                        roles.push(Roles.StudentUser);
                        this.userEditForm.get('roles').setValue(roles);
                    }
                });
        }
        if (event.options[0]['_value'] == 'Организатор' && index !== -1) {
            roles.splice(index, 1);
            this.userEditForm.get('roles').setValue(roles);
            const dialog = this.dialog.open(OrganizationComponent);
            dialog.afterClosed().subscribe((res) => {
                if (res) {
                    roles.push('Организатор');
                    this.userEditForm.get('roles').setValue(roles);
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
