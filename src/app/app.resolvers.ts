import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { UserService } from './core/user/user.service';
import { FuseConfigService } from '@fuse/services/config';
import { NotificationsService } from './layout/common/notifications/notifications.service';

@Injectable({
    providedIn: 'root',
})
export class InitialDataResolver  {
    /**
     * Constructor
     */
    constructor(
        private _notification: NotificationsService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(
            ): Observable<any> {
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this._notification.getAll()
        ]);
    }
}
