import { Routes, RouterModule } from '@angular/router';

export const adminRoutes: Routes = [
    {
        path: 'controlRoles',
        loadComponent: () =>
            import('app/modules/admin/controlRoles/controlRoles.component'),
    },
    {
        path: 'listathletes',
        loadChildren: () =>
            import(
                'app/modules/admin/listathletes/lislathletes.module'
            ).then((m) => m.LislathletesModule),
    },
    {
        path: 'result',
        loadChildren: () =>
            import('app/modules/admin/result/result.module').then(
                (m) => m.ResultModule
            ),
    },
    {
        path: 'controleventathletes',
        loadChildren: () =>
            import(
                'app/modules/admin/controleventathletes/controleventathletes.module'
            ).then((m) => m.ControleventathletesModule),
    },
    {
        path: 'organizationcontrol',
        loadComponent: () =>
            import('app/modules/admin/organizationControl/organizationControl.component'),
    },
    {
        path: 'news',
        loadComponent: () =>
            import('app/modules/admin/news/news.component'),
    },
    {
        path: 'advertising',
        loadComponent: () =>
            import('app/modules/admin/advertising/advertising.component'),
    },
    {
        path: 'controlPayment',
        loadComponent: () =>
            import('app/modules/admin/controlPayment/controlPayment.component'),
    },
    {
        path: 'results',
        loadChildren: () =>
            import(
                'app/modules/admin/event-athletes-list/event-athletes.module'
            ).then((m) => m.EventAthletesListModule),
    },
    {
        path: 'adminstatistics',
        loadChildren: () =>
            import(
                'app/modules/admin/adminstatistic/adminstatistic.module'
            ).then((m) => m.AdminstatisticModule),
    },
    {
        path: 'sps',
        loadChildren: () =>
            import('app/modules/admin/sps/sps.module').then(
                (m) => m.SpsModule
            ),
    },
    {
        path: 'userlist',
        loadChildren: () =>
            import('app/modules/admin/user/user.module').then(
                (m) => m.UserModule
            ),
    },
    {
        path: 'navigation',
        loadChildren: () =>
            import(
                'app/modules/admin/navigation-tree/navigation-tree.module'
            ).then((m) => m.NavigationTreeModule),
    },
    {
        path: 'eventslist',
        loadChildren: () =>
            import(
                'app/modules/admin/events-list/events-list.module'
            ).then((m) => m.EventsListModule),
    },
    {
        path: 'adminfeedback',
        loadComponent: () =>
            import('app/modules/admin/feedbackadmin/feedbackadmin.component'),
    },
    {
        path: 'videocontrol',
        loadChildren: () =>
            import(
                'app/modules/admin/videoGallery/videoGallery.module'
            ).then((m) => m.VideoGalleryModule),
    },
    {
        path: 'photocontrol',
        loadChildren: () =>
            import(
                'app/modules/admin/photoGallery/photoGallery.module'
            ).then((m) => m.PhotoGalleryModule),
    },
    {
        path: 'profile',
        loadChildren: () =>
            import('app/modules/user/profile/profile.module').then(
                (m) => m.profileModule
            ),
    },
];
