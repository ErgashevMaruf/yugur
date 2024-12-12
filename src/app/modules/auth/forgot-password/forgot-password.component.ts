import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
    Validators,
    FormBuilder,
    FormGroup,
    FormControl,
} from '@angular/forms';
import { catchError, map, of, pipe, takeUntil, timer } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/core/auth/auth.service';
import {
    AccountClient,
    HttpStatusCode,
    ResetPassword,
    ResetPasswordWithEmail,
    ResponseModelOfResetPassword,
} from 'nswag-api-auth';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'app/shared/messages/error/error.component';
import { ConfirmPasswordValidator } from '../sign-up/confirm-password.validator';
import { PasswordStrengthValidator } from '../sign-up/password.validation';
import { NotFoundComponent } from 'app/shared/messages/notFound/notFound.component';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { Router } from '@angular/router';
import { AlreadyhaveComponent } from 'app/shared/messages/alreadyhave/alreadyhave.component';
import { formsData } from '../input/input.component';

@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthForgotPasswordComponent implements OnInit, OnDestroy {
    forgotPasswordControl: FormGroup;
    showAlert: boolean = false;
    minutes: number;
    seconds: number;
    confirm: FormGroup;
    type = 'confirm';
    resetPassword = this.fb.group(
        {
            newpassword: ['', [Validators.required, PasswordStrengthValidator]],
            confirmpassword: ['', Validators.required],
        },

        {
            validator: ConfirmPasswordValidator(
                'newpassword',
                'confirmpassword'
            ),
        }
    );
    countValidation = 0;

    formsData: formsData[] = [
        {
            label: 'enter.your.email',
            placeholder: 'enter.your.email',
            nameFormControl: 'email',
        },
        {
            label: 'userName/pinfl',
            placeholder: 'userName/pinfl',
            nameFormControl: 'userName',
        },
    ];
    password: formsData[] = [
        {
            label: 'sign.password',
            nameFormControl: 'newpassword',
            placeholder: 'sign.password',
            type:'password'
        },
        {
            label: 'confirmpassword',
            nameFormControl: 'confirmpassword',
            placeholder: 'confirmpassword',
            type:'password'
        },
    ];
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private fb: FormBuilder,
        private authClient: AccountClient,
        private dialog: MatDialog,
        private router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.resetPassword.get('newpassword').valueChanges.subscribe((res) => {
            this.countValidation = 0;
            let upperCaseCharacters = /[A-Z]+/g;
            let lowerCaseCharacters = /[a-z]+/g;
            let numberCharacters = /[0-9]+/g;
            let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            let minlength = /^.{6,}$/;
            if (upperCaseCharacters.test(res)) {
                this.countValidation++;
            }
            if (lowerCaseCharacters.test(res)) {
                this.countValidation++;
            }
            if (specialCharacters.test(res)) {
                this.countValidation++;
            }
            if (minlength.test(res)) {
                this.countValidation++;
            }
            if (numberCharacters.test(res)) {
                this.countValidation++;
            }
        });
        this.confirm = this.fb.group({
            a: ['', Validators.required],
            b: ['', Validators.required],
            c: ['', Validators.required],
            d: ['', Validators.required],
        });
        // Create the form
        this.forgotPasswordControl = new FormGroup({
            email: new FormControl('', Validators.required),
            userName: new FormControl('', Validators.required)
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendEmailCode() {
        this.forgotPasswordControl.disable();
        this.authClient
            .forgotPassword(this.forgotPasswordControl.value).pipe(catchError(err=>{
                this.dialog.open(NotFoundComponent);
                this.forgotPasswordControl.enable();
                return of(false);
            })).subscribe((res) => {
                if(res)
                {
                    localStorage.setItem(
                        'email',
                        this.forgotPasswordControl.value.email
                    );
                    localStorage.setItem(
                        'userName',
                        this.forgotPasswordControl.value.userName
                    );
                    localStorage.setItem('type', 'confirm');
                    this.type = 'confirm';
                    this.forgotPasswordControl.enable();
                }
            });
    }
    confirmUser() {
        let code = this.confirm.value;
        code = code['a'] + code['b'] + code['c'] + code['d'] + '';
        if (!localStorage.getItem('email')) {
            this.dialog.open(ErrorComponent);
        }
        this.authClient
            .resetPasswordToken(
                new ResetPasswordWithEmail({
                    email: localStorage.getItem('email'),
                    emailConfirmedCode: code,
                    userName: localStorage.getItem('userName')
                })
            ).pipe(catchError(err=>{
                this.dialog.open(AlreadyhaveComponent, {
                    data: 'password',
                });
                return of(false);
            })).subscribe((res:ResponseModelOfResetPassword) => {
                if (res) {
                    this.type = 'password';
                    localStorage.setItem('type', this.type);
                    localStorage.setItem('user', JSON.stringify(res.result));
                }
            });
    }
    resetPasswordFunc() {
        if (!localStorage.getItem('user')) {
            this.dialog.open(ErrorComponent);
            return;
        }
        let user: ResetPassword = JSON.parse(localStorage.getItem('user'));
        this.authClient
            .resetPasswordUser(
                new ResetPassword({
                    token: user.token,
                    userId: user.userId,
                    newPassword: this.resetPassword.get('newpassword').value,
                })
            )
            .subscribe((res) => {
                if (res.statusCode == HttpStatusCode.OK) {
                    this._authService.signInByToken(res.result.token);
                    this.dialog.open(SuccessComponent);
                    setTimeout(() => {
                        this.router.navigate(['']);
                    }, 3000);
                }
            });
    }
    ngOnDestroy(): void {
        localStorage.removeItem('type');
        localStorage.removeItem('email');
        localStorage.removeItem('user');
    }
    tabPress(index:number)
    {
        const input:HTMLElement = document.getElementById('verification'+index);
        input.focus();
    }
}
