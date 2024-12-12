import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(private _authService: AuthService, private _router: Router) {}
    firstTime = true;

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
        return this._authService.check().pipe(
            switchMap((isAuth: boolean) => {
                if (isAuth) {
                    return of(true);
                }
                return of(this._router.parseUrl(`home`));
            })
        );
    }
}
