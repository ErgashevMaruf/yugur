import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationClient } from 'nswag-api/nswag-api-auth';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(
        private userService: UserService,
        private navigationClient: NavigationClient
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        return this.navigationClient.getNavigations().pipe(
            tap((navigation) => {
                this.userService.user$.subscribe((_user) => {
                    this.navigation = [];
                    let allNavigationOneArr = this.getAllNavigationOneArr(
                        navigation as FuseNavigationItem[]
                    );
                    this._navigation.next({
                        allNavigation:allNavigationOneArr,
                        default: navigation as FuseNavigationItem[],
                    });
                });
            })
        ) as Observable<Navigation>;
    }

    navigation = [];

    getAllNavigationOneArr(navigation) {
       for(let x of navigation)
        {
            if(x.children.length!==0)
            {
                this.getAllNavigationOneArr(x.children);
            }
            this.navigation.push({
                link:x.link,
                key:x.key,
            });
        }
        return this.navigation
    }

    // filterByUserPermission(
    //     compact: FuseNavigationItem[],
    //     _user: User
    // ): FuseNavigationItem[] {
    //     return compact?.map((item) => {
    //         if ('key' in item) {
    //             if ((item.key as string[]).includes(_user?.mainRole)) {
    //                 item.children = item.children?.map((child) => {
    //                     if ('key' in child) {
    //                         if (
    //                             (child.key as string[]).includes(
    //                                 _user?.mainRole
    //                             )
    //                         ) {
    //                             return child;
    //                         } else {
    //                             return {} as FuseNavigationItem;
    //                         }
    //                     } else return child;
    //                 });
    //                 return item;
    //             } else {
    //                 return {} as FuseNavigationItem;
    //             }
    //         }
    //         return item;
    //     });
    // }
}
