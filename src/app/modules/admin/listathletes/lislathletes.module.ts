import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListathletesComponent } from './listathletes.component';
import { TableModule } from 'primeng/table';
import { TranslocoModule } from '@ngneat/transloco';
import { Route, RouterModule } from '@angular/router';
import { SelectNumberForUsers } from 'app/shared/SelectNumberForUsers/selectNumberForUsers.module';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserEventComponent } from './addUserEvent/addUserEvent.component';
import { CardComponent } from './card/card.component';
import { NumberFormatPipeModule } from 'app/modules/pipes/numberFormat.module';
import { DropdownModule as PDropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

const route: Route[] = [
    {
        path: '',
        component: ListathletesComponent,
    },
    { path: 'card', component: CardComponent },
];

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        RouterModule.forChild(route),
        SelectNumberForUsers,
        CalendarModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        NumberFormatPipeModule,
        PDropdownModule,
        InputTextModule,
    ],
    declarations: [ListathletesComponent, AddUserEventComponent, CardComponent],
})
export class LislathletesModule {}
