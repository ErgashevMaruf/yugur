import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EventAthletesListComponent } from './event-athletes-list.component';
import { Route } from '@angular/router';
import { CaruselModule } from 'app/shared/carusel/carusel.module';

const route:Route[] = [{
    path:'',
    component:EventAthletesListComponent
}]

@NgModule({
    declarations: [
        EventAthletesListComponent
    ],
    imports: [
        CommonModule,
        TranslocoModule,
        MatIconModule,
        MatTooltipModule,
        CaruselModule
    ],
    exports:[]
})
export class EventAthletesListModule {}
