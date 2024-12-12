import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import {
    AccountClient,
    Login,
    OneIdClient,
    ResponseModelOfTokenModel,
    TokenModel,
} from 'nswag-api/nswag-api-auth';
import { Router } from '@angular/router';
import { NavigationService } from '../navigation/navigation.service';
import { Navigation } from '../navigation/navigation.types';

@Injectable()
export class AuthService {
    public _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _navigation: NavigationService,
        private _accountClient: AccountClient,
        private _oneIdClient: OneIdClient,
        private _router: Router
    ) {}
    isGetNavAndUser = false;
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        if (token !== undefined) {
            localStorage.setItem('accessToken', token);
        }
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }
    set refreshToken(token: string) {
        localStorage.setItem('refreshToken', token);
    }

    get refreshToken(): string {
        return localStorage.getItem('refreshToken') ?? '';
    }

    getUserAndNavigation() {
        this._userService.get().subscribe();
        this._navigation.get().subscribe();
    }

    signInByToken(token: string) {
        this.accessToken = token;
        this._router.navigate(['']);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    singInThroughSessId(sess_id: string) {
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        return this._oneIdClient.loginBySessId(sess_id).pipe(
            switchMap((response: TokenModel) => {
                localStorage.setItem('login', JSON.stringify(response));
                this.accessToken = response.token;
                this.refreshToken = response.refreshToken
                this._authenticated = true;
                return of(response);
            })
        );
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        if (this._authenticated) {
            return throwError('Выйдите и заново войдите в Систему');
        }
        const login = new Login();
        login.password = credentials.password;
        login.userName = credentials.email;
        return this._accountClient.login(login).pipe(
            switchMap((response: TokenModel) => {
                if (response?.token == null) {
                    return throwError('Неправильный логин и пароль');
                }
                this.accessToken = response.token;
                this.refreshToken = response.refreshToken;
                this._authenticated = true;
                this.getUserAndNavigation();
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._accountClient.refreshAccessToken(this.refreshToken).pipe(
            catchError(() =>
                // Return false
                of(false)
            ),
            switchMap((response: ResponseModelOfTokenModel) => {
                if (response?.result?.refreshToken) {
                    this.accessToken = response.result.token;
                    this.refreshToken = response.result.refreshToken;
                    this._authenticated = true;
                    this.getUserAndNavigation();
                    return of(true);
                }
                return of(false);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        //localStorage.removeItem('login');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean | Navigation> {
        if(!this.isGetNavAndUser && (this.accessToken || this._authenticated))
        {
            this.getUserAndNavigation();
            this.isGetNavAndUser = true
        }
        if (!this.accessToken) {
            return of(false);
        }
        if (this._authenticated) {
            return of(true);
        }
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return this.signInUsingToken();
        }
        return  of(true);
    }
}
