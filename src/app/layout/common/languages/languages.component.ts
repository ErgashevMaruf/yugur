import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { take } from 'rxjs';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { PrimeNGConfig } from 'primeng/api';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'languages',
    templateUrl: './languages.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'languages',
})
export class LanguagesComponent implements OnInit, OnDestroy {
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;
    navComponent: FuseVerticalNavigationComponent = null;
    /**
     * Constructor
     */
    lang = [
        {
            name: 'O’zb',
            value: 'uz-Latn-UZ',
        },
        {
            name: 'Рус',
            value: 'ru-Ru',
        },
        {
            name: 'Eng',
            value: 'en',
        },
    ];
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _translocoService: TranslocoService,
        // private config: PrimeNGConfig,
        private navigationService: NavigationService,
        private userService: UserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the available languages from transloco
        this.availableLangs = this._translocoService.getAvailableLangs();
        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.activeLang = activeLang;
            // Update the navigation
            this._updateNavigation();
        });
        //this.userService.user$.subscribe((user) => {
        setTimeout(() => {
            this._updateNavigation();
        }, 900);
        //});
        // Set the country iso codes for languages for flags
        this.flagCodes = {
            'uz-Latn-Uz': 'uz',
            'uz-Cyrl-Uz': 'uz',
            'ru-Ru': 'ru',
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang: string): void {
        // Set the active lang
        this._translocoService.setActiveLang(lang);
        // Save loacl storage current language
        localStorage.setItem('lang', lang);
        window.location.reload();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(): void {
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        this.navComponent =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                'mainNavigation'
            );

        // Return if the navigation component does not exist
        if (!this.navComponent) {
            return null;
        }

        // Get the flat navigation data
        const navigation = this.navComponent.navigation;

        if (navigation) {
            navigation.forEach((item) => {
                this.objectTranslate(item.id);
                this.navComponent.refresh();
                if (item.children) {
                    item.children.forEach((childeItem) => {
                        this.objectTranslate(childeItem.id);
                    });
                }
            });
        }
    }
    objectTranslate(id) {
        const object = this._fuseNavigationService.getItem(
            id,
            this.navComponent.navigation
        );
        if (object) {
            this._translocoService
                .selectTranslate(id)
                .pipe(take(1))
                .subscribe((translation) => {
                    object.title = translation;
                    this.navComponent.refresh();
                });
        }
    }
}
