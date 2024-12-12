import { NgClass } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { environment } from 'app/core/env/environment.prod';
import { TableMetaData } from 'nswag-api-auth';
import { EventBoxDTO, EventClient } from 'nswag-api-marathon';
import { StringToHtmlDirective } from './stringToHtml.directive';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { CarouselModule } from 'primeng/carousel';
import { ScrollWithMouseDirective } from 'app/modules/directives/scrollWithMouse.directive';
import { SkeletonModule } from 'primeng/skeleton';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { EventsModule } from 'app/modules/user/events/events.module';
import { EventsLoopComponent } from 'app/modules/user/events/eventsLoop/eventsLoop.component';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { ActiveEventNotFoundComponent } from 'app/modules/user/activeEventNotFound/activeEventNotFound.component';

@Component({
    selector: 'app-event-carusel',
    templateUrl: './carusel.component.html',
    styleUrls: ['./carusel.component.scss'],
    standalone: true,
    imports: [
    MatTooltipModule,
    StringToHtmlDirective,
    MatIconModule,
    TranslocoModule,
    NgClass,
    CarouselModule,
    ScrollWithMouseDirective,
    SkeletonModule,
    SlickCarouselModule,
    EventsLoopComponent,
    TranslateAsyncPipe,
    TooltipModule,
],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaruselComponent implements OnInit, AfterViewInit {
    url = environment.URL;
    events: EventBoxDTO[];
    isMobile = true;

    constructor(
        private eventClient: EventClient,
        private _cdr: ChangeDetectorRef,
        private _fuseMedia: FuseMediaWatcherService
    ) {}
    ngAfterViewInit(): void {}
    ngOnInit() {
        this.isMobile = window.innerWidth<600;
        this.eventClient
            .allActiveEventEventBoxesList(
                new TableMetaData({
                    first: 0,
                    rows: 30,
                    filters: '{}',
                    sortOrder: 0,
                })
            )
            .subscribe((res) => {
                this.events = res.result.items;
                this._cdr.markForCheck();
            });
    }
}
