import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { TableModule } from 'primeng/table';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { CheckPaswordModule } from 'app/shared/checkPassword/checkPassword.module';
import { MatListModule } from '@angular/material/list';
import { OrganizationComponent } from './user-form/organization/organization.component';
import { DropdownModule as PDropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
const routes: Routes = [
    {
        path: '',
        component: UserComponent,
    },
];
@NgModule({
    imports: [
    CommonModule,
    CalendarModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule,
    TableModule,
    MatIconModule,
    TranslocoModule,
    CheckPaswordModule,
    MatListModule,
    PDropdownModule,
    InputTextModule,
    IconFieldModule,
    ImageModule,
    TooltipModule,
    InputIconModule,
    ButtonModule,

],
    declarations: [UserComponent,OrganizationComponent,
        UserFormComponent],
})
export class UserModule {}
