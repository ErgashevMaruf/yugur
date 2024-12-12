import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule()
export class IconsModule {
    /**
     * Constructor
     */
    constructor(
        private _domSanitizer: DomSanitizer,
        private _matIconRegistry: MatIconRegistry
    ) {
        // Register icon sets
        this._matIconRegistry.addSvgIconSet(
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/material-twotone.svg'
            )
        );
        this._matIconRegistry.addSvgIconSetInNamespace(
            'mat_outline',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/material-outline.svg'
            )
        );
        this._matIconRegistry.addSvgIconSetInNamespace(
            'mat_solid',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/material-solid.svg'
            )
        );
        this._matIconRegistry.addSvgIconSetInNamespace(
            'feather',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/feather.svg'
            )
        );
        this._matIconRegistry.addSvgIconSetInNamespace(
            'heroicons_outline',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/heroicons-outline.svg'
            )
        );
        this._matIconRegistry.addSvgIconSetInNamespace(
            'heroicons_solid',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/heroicons-solid.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'locationLanding',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/location.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'runLanding',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/run.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'userLanding',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/user.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'moneyLanding',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/money.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'messageCustom',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/customSvg/messageCustom.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'calendarLanding',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/calendarLanding.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'organization',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/organizationLanding.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'peopleLanding',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/people.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'sendLanding',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/send.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'crownLanding',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/crown.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'runningLanding',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/running.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'locationFooter',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/footer/location.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'signCalendar',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/signIn/signCalendar.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'mailFooter',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/footer/mail.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'logoutNav',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/customSvg/logout.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'phoneFooter',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/footer/phone.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'instagramFooter',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/footer/instagram.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'webFooter',
        this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/landing/footer/web.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'running',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/customSvg/running.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'number',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/customSvg/number.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'navHome',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/navigation/home.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'navEvent',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/navigation/event.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'navScore',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/navigation/award.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'navHistory',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/navigation/history.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'navMessage',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/navigation/message.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'editProfile',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/customSvg/edit.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'fileFeedback',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/customSvg/file.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'finishCustom',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/customSvg/finish.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'passportCustom',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/customSvg/passport.svg'
            )
        );
        this._matIconRegistry.addSvgIcon(
            'imgCustom',
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                './assets/customSvg/image.svg'
            )
        );
    }
}
