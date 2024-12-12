import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthModule } from 'app/core/auth/auth.module';
import { IconsModule } from 'app/core/icons/icons.module';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';
import { CInterceptor } from './helper/cInterceptor';
import { ErrorInterceptor } from './helper/error.interceptor';

@NgModule({
    imports: [AuthModule, IconsModule, TranslocoCoreModule, HttpClientModule],
    providers: [
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CInterceptor,
            multi: true,
        },
    ],
})
export class CoreModule {
    /**
     * Constructor
     */
    constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
        // Do not allow multiple injections
        if (parentModule) {
            throw new Error(
                'CoreModule has already been loaded. Import this module in the AppModule only.'
            );
        }
    }
}
