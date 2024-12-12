import {
    Component,
    HostListener,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    UntypedFormBuilder,
    NgForm,
    Validators,
    FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'app/core/env/environment';
import { formsData } from '../input/input.component';
import { UserService } from 'app/core/user/user.service';
@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styles: `
    .move-right {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);

}
.slidingDiv {
    transition: 0.3s ease-in-out;
    -webkit-transition: 0.3s ease-in-out;
}
    `,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    active = 'oneid';
    showPassword = 'password';
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    urlAPIOneId: string = environment.API_BASE_URL + '/api/auth/OneId/OneIdApi';
    scopeOneId: string;
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private dialog: MatDialog
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    formsData: formsData[] = [
        {
            label: 'sign.login',
            placeholder: 'Ваш логин',
            nameFormControl: 'email',
        },
        {
            label: 'sign.password',
            placeholder: '••••••••',
            nameFormControl: 'password',
            type: 'password',
        },
    ];
    @HostListener('document:keydown.enter', ['$event']) onKeydownHandler(
        event: KeyboardEvent
    ) {
        if (this.signInForm.valid) {
            this.signIn();
        }
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this._authService.signOut();
        // Create the form
        this.dialog.closeAll();
        this.scopeOneId = 'Yugur'; // location.origin;
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required],
            rememberMe: [false],
        });
        this.signInForm.valueChanges.subscribe((res) => {
            this.alert.type = 'basic';
        });
    }

    oneID() {
        this.getOneId(
            'one_code',
            'yugur_at',
            this.urlAPIOneId,
            this.scopeOneId,
            '{"method":"IDPW"}'
        );
    }
    getOneId(
        response_type: string | null,
        client_id: string | null,
        redirect_uri: string | null,
        scope: string | null,
        state: string | null
    ) {
        let url_ =
            'https://sso.egov.uz/sso/oauth/Authorization.do?' +
            'response_type={response_type}&client_id={client_id}&redirect_uri={redirect_uri}&scope={scope}&state={state}';
        if (response_type === undefined || response_type === null)
            throw new Error("The parameter 'response_type' must be defined.");
        url_ = url_.replace(
            '{response_type}',
            encodeURIComponent('' + response_type)
        );
        if (client_id === undefined || client_id === null)
            throw new Error("The parameter 'client_id' must be defined.");
        url_ = url_.replace('{client_id}', encodeURIComponent('' + client_id));
        if (redirect_uri === undefined || redirect_uri === null)
            throw new Error("The parameter 'redirect_uri' must be defined.");
        url_ = url_.replace(
            '{redirect_uri}',
            encodeURIComponent('' + redirect_uri)
        );
        if (scope === undefined || scope === null)
            throw new Error("The parameter 'scope' must be defined.");
        url_ = url_.replace('{scope}', encodeURIComponent('' + scope));
        if (state === undefined || state === null)
            throw new Error("The parameter 'state' must be defined.");
        url_ = url_.replace('{state}', encodeURIComponent('' + state));

        url_ = url_.replace(/[?&]$/, '');
        window.open(url_, '_self');
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    passWordShow() {
        this.showPassword =
            this.showPassword == 'password' ? 'text' : 'password';
    }

    /**
     * Sign in
     */
    signIn(): void {
        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value).subscribe(
            () => {
                if (localStorage.getItem('eventId')) {
                    this._router.navigate([
                        'details',
                        +localStorage.getItem('eventId'),
                    ]);
                    return;
                }
                this._router.navigate(['dashboard']);
            },
            (response) => {
                // Re-enable the form
                this.signInForm.enable();

                // Reset the form
                this.signInForm.reset();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'Неправильный логин и пароль!',
                };

                // Show the alert
                this.showAlert = true;
            }
        );
    }
}
