import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControleventathletesComponent } from './controleventathletes.component';
import { Route, RouterModule } from '@angular/router';
import { CaruselModule } from 'app/shared/carusel/carusel.module';
import { TranslocoModule } from '@ngneat/transloco';
import { ControlbyeventComponent } from './controlbyevent/controlbyevent.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

const route:Route[] = [{
    path:'',
    component:ControleventathletesComponent
},
    {
        path:'controlbyevent/:id',
        component: ControlbyeventComponent
    }

]

@NgModule({
  imports: [
    CommonModule,
    CaruselModule,
    TranslocoModule,
    RouterModule.forChild(route),
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    DropdownModule
],
  declarations: [ControleventathletesComponent, ControlbyeventComponent]
})
export class ControleventathletesModule { }
