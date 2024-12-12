import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxMaskModule } from 'ngx-mask';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

const routerConfig: ExtraOptions = {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    useHash: true,
};
export function playerFactory() {
    return player;
}
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        // Core module of your application
        CoreModule,
        // Layout module of your application
        LayoutModule,
        MatSnackBarModule,
        MatDialogModule,
        TranslocoModule,
        NgxMaskModule.forRoot(),
        LottieModule.forRoot({ player: playerFactory }),
    ],
    bootstrap: [AppComponent],
    providers: [],
})
export class AppModule {}
