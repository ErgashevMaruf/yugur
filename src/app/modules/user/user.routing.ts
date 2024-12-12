import { Routes, RouterModule } from '@angular/router';

export const userRoutes: Routes = [
    {
        path: 'scores',
        loadChildren: () =>
            import('app/modules/user/scores/scores.module').then(
                (m) => m.ScoresModule
            ),
    },
    {
        path: 'events/details/:id',
        loadChildren: () =>
            import('app/modules/user/events/events.module').then(
                (m) => m.EventsModule
            ),
    },
    {
        path: 'events',
        loadChildren: () =>
            import('app/modules/user/list/list.module').then(
                (m) => m.ListModule
            ),
    },
    {
        path: 'myEvents',
        loadChildren: () =>
            import('app/modules/user/myEvents/myEvents.module').then(
                (m) => m.MyEventsModule
            ),
    },
    {
        path: 'feedback',
        loadChildren: () =>
            import('app/modules/user/feedback/feedback.module').then(
                (m) => m.feedbackModule
            ),
    },
    {
        path: 'profile',
        loadChildren: () =>
            import('app/modules/user/profile/profile.module').then(
                (m) => m.profileModule
            ),
    },
];
