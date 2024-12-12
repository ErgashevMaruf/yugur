import { NgModule } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MyEventsComponent } from './myEvents.component';
import { CaruselModule } from 'app/shared/carusel/carusel.module';
import { Route, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

const route:Route[]=[{
    path:'',
    component:MyEventsComponent
}]

@NgModule({
    imports: [CommonModule, CaruselModule, TranslocoModule,
        RouterModule.forChild(route),
    ],
    declarations: [MyEventsComponent],
})
export class MyEventsModule {}
