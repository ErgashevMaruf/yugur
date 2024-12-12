import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    map,
    Observable,
    ObservableInput,
    of,
    ReplaySubject,
    switchMap,
    tap,
} from 'rxjs';
import { User } from 'app/core/user/user.types';
import {
    AccountClient,
    ResponseModelOfUserRegistrDTO,
    UserProfile,
    UserRegistrDTO,
} from 'nswag-api-auth';
import { FilesInfoClient } from 'nswag-api-files';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    userInfo: UserRegistrDTO;
    private _isAdmin: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    private _isSmallScreen: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _accountClient: AccountClient,
        private _fileInfoClient: FilesInfoClient
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    set isAdmin(value: boolean) {
        this._isAdmin.next(value);
    }
    get isAdmin$(): Observable<boolean> {
        return this._isAdmin.asObservable();
    }
    set isSmallScreen(value: boolean) {
        this._isSmallScreen.next(value);
    }
    get isSmallScreen$(): Observable<boolean> {
        return this._isSmallScreen.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        return this._accountClient.getUserProfile().pipe(
            switchMap<ResponseModelOfUserRegistrDTO, ObservableInput<User>>(
                (userProfile) => {
                    this.userInfo = userProfile.result;
                    let user = Object.assign(new User(), userProfile.result);
                    return this.getUserImage(user).pipe(
                        map((response) => {
                            if (response != null)
                                user.tbFileImageBase64 = user.avatar = response;
                            user.status = 'online';
                            //this._userValue = user;
                            this.user = user;
                            let isAdmin = !(
                                user.mainRole == 'Обычный пользователь' ||
                                user.mainRole == 'Студент-пользователь' ||
                                user.mainRole == 'Военный пользователь' ||
                                user.mainRole == 'Организатор'
                            );
                            this.isSmallScreen = !isAdmin
                            this.isAdmin = isAdmin;
                            return user;
                        })
                    );
                }
            )
        );
    }
    // Get User image
    getUserImage(user: User): Observable<string> {
        if (!user.imageFileId) {
            return of(null);
        }
        return this._fileInfoClient.getFileBase64ById(user.imageFileId);
    }
    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
