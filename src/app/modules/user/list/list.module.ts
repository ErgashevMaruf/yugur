import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { TranslocoModule } from '@ngneat/transloco';
import { CaruselModule } from 'app/shared/carusel/carusel.module';
import { ActiveEventNotFoundComponent } from "../activeEventNotFound/activeEventNotFound.component";


const routes: Routes = [
    { path: '', component: ListComponent },
]

@NgModule({
    declarations: [
        ListComponent
    ],
    imports: [
    CommonModule,
    TranslocoModule,
    RouterModule.forChild(routes),
    CaruselModule,
    ActiveEventNotFoundComponent
],
})
export class  ListModule{ }
