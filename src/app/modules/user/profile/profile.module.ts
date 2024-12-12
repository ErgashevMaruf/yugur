import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { PersonalInfoComponent } from './personalInfo/personalInfo.component';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { ClubComponent } from './club/club.component';
import { NgxMaskModule } from 'ngx-mask';
import { CheckPaswordModule } from 'app/shared/checkPassword/checkPassword.module';
import { CheckboxModule } from 'primeng/checkbox';
import {  MatIconModule } from '@angular/material/icon';
import { LocationPipe } from './personalInfo/location.pipe';
import { InputComponent } from 'app/modules/auth/input/input.component';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

const profileRoutes: Route[] = [
    {
        path: '',
        component: ProfileComponent,
    },
];

@NgModule({
    declarations: [ProfileComponent, PersonalInfoComponent, ClubComponent],
    imports: [
        RouterModule.forChild(profileRoutes),
        CalendarModule,
        PasswordModule,
        DropdownModule,
        NgxMaskModule,
        CheckPaswordModule,
        CheckboxModule,
        MatIconModule,
        LocationPipe,
        TranslocoModule,
        ReactiveFormsModule,
        AsyncPipe,
        InputComponent
    ],
})
export class profileModule {}
