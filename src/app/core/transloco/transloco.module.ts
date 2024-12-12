import {
    Translation,
    TRANSLOCO_CONFIG,
    TRANSLOCO_LOADER,
    translocoConfig,
    TranslocoModule,
    TranslocoService,
} from '@ngneat/transloco';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslocoHttpLoader } from 'app/core/transloco/transloco.http-loader';
import { environment } from '../env/environment';

@NgModule({
    exports: [TranslocoModule],
    providers: [
        {
            // Provide the default Transloco configuration
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs: [
                    {
                        id: 'uz-Latn-UZ',
                        label: 'Uzbek(latin)',
                    },
                    {
                        id: 'en',
                        label: 'English',
                    },
                    {
                        id: 'ru-Ru',
                        label: 'Русский',
                    },
                ],
                defaultLang: 'ru-Ru',
                fallbackLang: 'ru-Ru',
                reRenderOnLangChange: true,
                prodMode: environment.production,
            }),
        },
        {
            // Provide the default Transloco loader
            provide: TRANSLOCO_LOADER,
            useClass: TranslocoHttpLoader,
        },
        {
            // Preload the default language before the app starts to prevent empty/jumping content
            provide: APP_INITIALIZER,
            deps: [TranslocoService],
            useFactory:
                (translocoService: TranslocoService): any =>
                (): Promise<Translation> => {
                    let lang = localStorage.getItem('lang');
                    if (!lang) {
                        lang = translocoService.getDefaultLang();
                        localStorage.setItem('lang', lang);
                    }
                    translocoService.setActiveLang(lang);
                    return translocoService.load(lang).toPromise();
                },
            multi: true,
        },
    ],
})
export class TranslocoCoreModule {}
