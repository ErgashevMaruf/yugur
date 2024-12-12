import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { landingHomeRoutes } from 'app/modules/landing/home/home.routing';
import { InfoComponent } from './info/info.component';
import { VideoComponent } from './video/video.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { OrganizersComponent } from './organizers/organizers.component';
import { VideoGalleryComponent } from './videoGallery/videoGallery.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollTopModule } from 'primeng/scrolltop';
import { NgxMaskModule } from 'ngx-mask';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { CountUpDirectiveModule } from 'app/modules/directives/countUpDirective.module';
import { CalendarModule } from 'primeng/calendar';
import { CaruselComponent } from './carusel/carusel.component';
import { ResultTableComponent } from 'app/shared/result-table/result-table.component';
import { NearestComponent } from 'app/shared/nearest/nearest.component';
import { StatisticComponent } from 'app/shared/statistic/statistic.component';
import { ScrollWithMouseDirective } from 'app/modules/directives/scrollWithMouse.directive';
import { ObserveVisibilityDirective } from 'app/modules/directives/intersection.directive';
import { VideoGuidComponent } from './video-guid/video-guid.component';
import { NavComponent } from 'app/modules/landing/home/nav/nav.component';
import { TranslocoModule } from '@ngneat/transloco';
import { FooterComponent } from 'app/shared/Components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
@NgModule({
    declarations: [
        LandingHomeComponent,
        InfoComponent,
        VideoComponent,
        AnnouncementComponent,
        OrganizersComponent,
        VideoGalleryComponent,
        GalleryComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(landingHomeRoutes),
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        ScrollTopModule,
        MatIconModule,
        NgxMaskModule,
        FuseScrollbarModule,
        CountUpDirectiveModule,
        CalendarModule,
        CaruselComponent,
        ResultTableComponent,
        NearestComponent,
        StatisticComponent,
        ScrollWithMouseDirective,
        ObserveVisibilityDirective,
        VideoGuidComponent,
        NavComponent,
        TranslocoModule,
        FooterComponent,
        SkeletonModule,
        AsyncPipe,
        TranslateAsyncPipe
    ],
})
export class LandingHomeModule {}
