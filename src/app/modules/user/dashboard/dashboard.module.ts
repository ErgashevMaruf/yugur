import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardComponent } from 'app/modules/user/dashboard/dashboard.component';
import { PayComponent } from './pay/pay.component';
import { ActiveEventNotFoundComponent } from '../activeEventNotFound/activeEventNotFound.component';
import { ResultTableComponent } from 'app/shared/result-table/result-table.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CaruselModule } from 'app/shared/carusel/carusel.module';
import { TranslocoModule } from '@ngneat/transloco';
const exampleRoutes: Route[] = [
    {
        path: '',
        component: DashboardComponent,
    },
];

@NgModule({
    declarations: [DashboardComponent, PayComponent],
    imports: [
        RouterModule.forChild(exampleRoutes),
        ActiveEventNotFoundComponent,
        ResultTableComponent,
        CaruselModule,
        NgFor,
        TranslocoModule,
        NgClass,
        NgIf
    ],
})
export class DashboardModule {}
