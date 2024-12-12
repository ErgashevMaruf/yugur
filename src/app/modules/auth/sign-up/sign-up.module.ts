import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { AuthSignUpComponent } from 'app/modules/auth/sign-up/sign-up.component';
import { authSignupRoutes } from 'app/modules/auth/sign-up/sign-up.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoPersonComponent } from './info-person/info-person.component';
import { ForeignCountryComponent } from './foreign-country/foreign-country.component';
import { CreateLoginComponent } from './create-login/create-login.component';
import { NgxMaskModule } from 'ngx-mask';
import { SignUpService } from './sign-up.service';
import { CalendarModule } from 'primeng/calendar';
import { CheckPaswordModule } from 'app/shared/checkPassword/checkPassword.module';
import { DropdownModule as PrimengDropdown } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputComponent } from '../input/input.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { NgClass } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
    declarations: [
        AuthSignUpComponent,
        InfoPersonComponent,
        ForeignCountryComponent,
        CreateLoginComponent,
    ],
    imports: [
        NgClass,
        CalendarModule,
        RouterModule.forChild(authSignupRoutes),
        FuseCardModule,
        FuseAlertModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule,
        CheckPaswordModule,
        PrimengDropdown,
        InputTextModule,
        TabMenuModule,
        InputComponent,
        RadioButtonModule,
        MatIconModule,
        TranslocoModule,
        AccordionModule
    ],
    providers: [SignUpService],
})
export class AuthSignUpModule {}
