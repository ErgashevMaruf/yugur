import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from './app.resolvers';
import { userRoutes } from './modules/user/user.routing';
import { adminRoutes } from './modules/admin/admin.routing';
import { NavigationGuard } from './core/auth/guards/navigation.guard';
import { CheckAdmin } from './core/auth/guards/checkAdmin.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';

export const appRoutes: Route[] = [
    // Redirect empty path to '/dashboard'
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    // Auth routes for guests
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'home',
                canMatch:[NoAuthGuard],
                loadChildren: () =>
                    import('app/modules/landing/home/home.module').then(
                        (m) => m.LandingHomeModule
                    ),
            },
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((m) => m.AuthConfirmationRequiredModule),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((m) => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
            {
                path: 'oneid',
                loadChildren: () =>
                    import('app/modules/auth/oneid/oneid.module').then(
                        (m) => m.OneidModule
                    ),
            },
            {
                path: 'faceId/:id',
                loadComponent: () =>
                    import('./modules/faceId/faceId.component'),
            },
        ],
    },

    // Auth user
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve:{
            data: InitialDataResolver
        },
        children: [
            {
                path: '',
                canMatch: [NavigationGuard],
                children: [...userRoutes, ...adminRoutes],
            },
            {
                path: 'dashboard',
                canMatch: [CheckAdmin],
                loadChildren: () =>
                    import('app/modules/user/dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: 'notification',
                loadComponent: () =>
                    import('app/modules/notification/notification.component'),
            },
            {
                path: 'audit',
                loadComponent: () =>
                    import('app/modules/audit/audit.component'),
            },
        ],
    },
];
