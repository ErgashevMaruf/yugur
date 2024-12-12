import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import {
    NewsClient,
    NotificationAthletesStatus,
    NotificationDTO,
    NotificationStatus,
} from 'nswag-api-marathon';
import { TranslocoService } from '@ngneat/transloco';
import { NotificationsService } from './notifications.service';

@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'notifications',
})
export class NotificationsComponent implements OnInit, OnDestroy {
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel')
    private _notificationsPanel: TemplateRef<any>;

    notifications: NotificationDTO[];
    unreadCount: number = 0;
    activeLang: string;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private notificationClient: NewsClient,
        private translocoService: TranslocoService,
        private _notificationService: NotificationsService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.activeLang = this.translocoService.getActiveLang();
        this.activeLang =
            this.activeLang == 'uz-Latn-UZ'
                ? 'titleUz'
                : this.activeLang == 'ru-Ru'
                ? 'titleRu'
                : 'titleEn';
        this._notificationService.notifications$.subscribe((res) => {
            this.notifications = res;
            this._calculateUnreadCount();
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlay
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the notifications panel
     */
    openPanel(): void {
        // Return if the notifications panel or its origin is not defined
        if (!this._notificationsPanel || !this._notificationsOrigin) {
            return;
        }

        // Create the overlay if it doesn't exist
        if (!this._overlayRef) {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(
            new TemplatePortal(this._notificationsPanel, this._viewContainerRef)
        );
    }

    /**
     * Close the notifications panel
     */
    closePanel(): void {
        this._overlayRef.detach();
    }

    /**
     * Mark all notifications as read
     */
    /**
     * Toggle read status of the given notification
     */
    readNotification(id: number, index: number) {
        this.notificationClient.seenNotification(id).subscribe((res) => {
            if (res) {
                this.notifications[index].notificationAthletesStatus =
                    NotificationAthletesStatus.Seen;
                this._calculateUnreadCount();
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    /**
     * Delete the given notification
     */
    delete(id: number) {
        this._notificationService.delete(id).subscribe((res) => {
            console.log(res);
        });
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

    private _calculateUnreadCount(): void {
        let count = 0;

        if (this.notifications && this.notifications.length) {
            count = this.notifications.filter(
                (notification) => notification.notificationAthletesStatus == 0
            ).length;
        }

        this.unreadCount = count;
    }
    /**
     * Create the overlay
     */
    private _createOverlay(): void {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop: true,
            backdropClass: 'fuse-backdrop-on-mobile',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay
                .position()
                .flexibleConnectedTo(
                    this._notificationsOrigin._elementRef.nativeElement
                )
                .withLockedPosition(true)
                .withPush(true)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                    },
                    {
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top',
                    },
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom',
                    },
                ]),
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }
}
