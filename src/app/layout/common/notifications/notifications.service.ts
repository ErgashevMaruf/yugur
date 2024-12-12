import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, switchMap, take, tap } from 'rxjs';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import {
    NewsClient,
    NotificationClient,
    NotificationDTO,
    ResponseModelOfBoolean,
} from 'nswag-api-marathon';

@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    private _notifications: ReplaySubject<NotificationDTO[]> =
        new ReplaySubject<NotificationDTO[]>(1);
    private $news = inject(NewsClient);
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for notifications
     */
    get notifications$(): Observable<NotificationDTO[]> {
        return this._notifications.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all notifications
     */
    getAll(): Observable<NotificationDTO[]> {
        return this.$news.getAllNotification().pipe(
            tap((notifications) => {
                console.log(notifications);

                this._notifications.next(notifications);
            })
        );
    }

    /**
     * Create a notification
     *
     * @param notification
     */
    /**
     * Update the notification
     *
     * @param id
     * @param notification
     */
    // update(id: string, notification: Notification): Observable<Notification> {
    //     return this.notifications$.pipe(
    //         take(1),
    //         switchMap((notifications) =>
    //             this._httpClient
    //                 .patch<Notification>('api/common/notifications', {
    //                     id,
    //                     notification,
    //                 })
    //                 .pipe(
    //                     map((updatedNotification: Notification) => {
    //                         // Find the index of the updated notification
    //                         const index = notifications.findIndex(
    //                             (item) => item.id === id
    //                         );

    //                         notifications[index] = updatedNotification;

    //                         // Update the notifications
    //                         this._notifications.next(notifications);

    //                         // Return the updated notification
    //                         return updatedNotification;
    //                     })
    //                 )
    //         )
    //     );
    // }

    /**
     * Delete the notification
     *
     * @param id
     */
    delete(id: number): Observable<boolean> {
        return this.notifications$.pipe(
            take(1),
            switchMap((notifications) =>
                this.$news.removeNotification(id).pipe(
                    map((isDeleted: ResponseModelOfBoolean) => {
                        if (isDeleted.result) {
                            // Find the index of the deleted notification
                            const index = notifications.findIndex(
                                (item) => item.id === id
                            );

                            // Delete the notification
                            notifications.splice(index, 1);

                            // Update the notifications
                            this._notifications.next(notifications);

                            // Return the deleted status
                            return true;
                        }
                        return false;
                    })
                )
            )
        );
    }

    /**
     * Mark all notifications as read
     */
    // markAllAsRead(): Observable<boolean> {
    //     return this.notifications$.pipe(
    //         take(1),
    //         switchMap((notifications) =>
    //             this._httpClient
    //                 .get<boolean>('api/common/notifications/mark-all-as-read')
    //                 .pipe(
    //                     map((isUpdated: boolean) => {
    //                         // Go through all notifications and set them as read
    //                         notifications.forEach((notification, index) => {
    //                             notifications[index].read = true;
    //                         });

    //                         // Update the notifications
    //                         this._notifications.next(notifications);

    //                         // Return the updated status
    //                         return isUpdated;
    //                     })
    //                 )
    //         )
    //     );
    // }
}
