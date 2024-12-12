import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
    AccountClient,
    HttpStatusCode,
    UserApplicationStatus,
} from 'nswag-api-auth';
import { UserRegistrDTO } from './UserRegistrDTO';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { PasswordStrengthValidator } from './password.validation';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { Router } from '@angular/router';
import { Subject, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorComponent } from 'app/shared/messages/error/error.component';
@Injectable()
export class SignUpService {
    selItem: UserRegistrDTO = new UserRegistrDTO();
    isCitizenUzbekistan = true;
    isAdult = true;
    show = false;
    isOrganizer = false;
    organizerOrNotsignal = new Subject<boolean>();

    access = this.fb.group(
        {
            userName: ['', Validators.required],
            phoneMain: ['', Validators.required],
            password: ['', [Validators.required, PasswordStrengthValidator]],
            confirmPassword: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            surname: ['', Validators.required],
            name: ['', Validators.required],
            spRegionId: ['', Validators.required],
            spDistrictId: ['', Validators.required],
            spSexId: ['', Validators.required],
            birthDate: ['', Validators.required],
            spCountryId: ['', Validators.required],
        },
        {
            validator: ConfirmPasswordValidator('password', 'confirmPassword'),
        }
    );
    constructor(
        private fb: FormBuilder,
        private accountClient: AccountClient,
        private matdialog: MatDialog,
        private router: Router
    ) {}
    save() {
        let userDTOModel = new UserRegistrDTO();
        userDTOModel.init(this.access.value);
        userDTOModel.isFromGCP = false;
        userDTOModel.isPassportUzb = false;
        userDTOModel.isForeign = !this.isCitizenUzbekistan;
        userDTOModel.isChangePassword = false;
        for (const [key, value] of Object.entries(userDTOModel)) {
            if (!value && value != false) {
                delete userDTOModel[key];
            }
        }
        userDTOModel.phoneMain = '+998'+userDTOModel.phoneMain;
        userDTOModel.userApplicationStatus = UserApplicationStatus.Default;
        this.accountClient
            .registerUser(userDTOModel)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let data = '';
                    if (error.status == HttpStatusCode.Found) {
                        data = 'loginAlreadyExist';
                    } else if (error.status == HttpStatusCode.BadRequest) {
                        data = 'emailAlreadyExist';
                    } else if (error.status == HttpStatusCode.GatewayTimeout) {
                        data = 'gcpError';
                    } else if (error.status == HttpStatusCode.NotImplemented) {
                        data = 'whileSavingError';
                    } else if (error.status == HttpStatusCode.Forbidden) {
                        data = 'Pinflexist';
                    } else if (error.status == HttpStatusCode.NotModified) {
                        data = 'checkTheData';
                    }
                    this.matdialog.open(ErrorComponent, {
                        data: data,
                    });
                    return throwError(() => error);
                })
            )
            .subscribe((res) => {
                if (res.statusCode == HttpStatusCode.OK) {
                    this.access.reset();
                    this.matdialog.open(SuccessComponent);
                    setTimeout(() => {
                        this.router.navigate(['/sign-in']);
                    }, 3000);
                }
            });
    }
    resetAll() {
        this.access.reset();
        this.show = false;
    }
}

export const StrongPasswordRegx: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
