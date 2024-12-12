import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { Roles } from 'app/core/user/Roles';

@Injectable({
    providedIn: 'root',
})
export class CheckAdmin {
    constructor(private _user: UserService, private _router: Router) {}

    canMatch(
        route: Route,
        segments: UrlSegment[]
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this._check(segments);
    }
    private _check(segments: UrlSegment[]): Observable<boolean | UrlTree> {
        return this._user.user$.pipe(
            switchMap((currentUser) => {
                if (
                    currentUser.mainRole == Roles.Admin ||
                    currentUser.mainRole == Roles.Moderator ||
                    currentUser.mainRole == Roles.Operator
                ) {
                    return of(this._router.parseUrl('adminstatistics'));
                }
                return of(true);
            })
        );
    }
}
