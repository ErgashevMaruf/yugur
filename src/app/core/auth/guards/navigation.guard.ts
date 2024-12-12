import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { NavigationService } from 'app/core/navigation/navigation.service';

@Injectable({
    providedIn: 'root',
})
export class NavigationGuard {
    constructor(
        private _navigation: NavigationService,
        private _router: Router
    ) {}

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
        return this._navigation.navigation$.pipe(
            switchMap((navigation) => {
                let isHasPermission = navigation.allNavigation.findIndex((el) =>
                    el.link.includes(segments[0].path)
                );
                if (
                    isHasPermission !== -1 ||
                    segments[0].path == 'sign-out' ||
                    segments[0].path == 'dashboard' ||
                    segments[0].path == 'notification'
                ) {
                    return of(true);
                } else {
                    return of(this._router.parseUrl(`dashboard`));
                }
            })
        );
    }
}
