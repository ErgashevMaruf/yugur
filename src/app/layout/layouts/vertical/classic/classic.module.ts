import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { LanguagesModule } from 'app/layout/common/languages/languages.module';

import { ClassicLayoutComponent } from 'app/layout/layouts/vertical/classic/classic.component';
import { NavComponent } from 'app/modules/landing/home/nav/nav.component';
import { NgIf } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { ThemeComponent } from 'app/shared/theme/theme.component';
import { UserModule } from 'app/layout/common/user/user.module';
import { NotificationsModule } from 'app/layout/common/notifications/notifications.module';

@NgModule({
    declarations: [
        ClassicLayoutComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        FuseLoadingBarModule,
        FuseNavigationModule,
        LanguagesModule,
        MatIconModule,
        NgIf,
        TranslocoModule,
        ThemeComponent,
        MatIconModule,
        UserModule,
        NotificationsModule,
        MatIconModule,
    ],
    exports     : [
        ClassicLayoutComponent
    ]
})
export class ClassicLayoutModule
{
}
