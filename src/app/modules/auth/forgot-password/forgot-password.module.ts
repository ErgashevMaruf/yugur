import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { AuthForgotPasswordComponent } from 'app/modules/auth/forgot-password/forgot-password.component';
import { authForgotPasswordRoutes } from 'app/modules/auth/forgot-password/forgot-password.routing';
import { InputTextModule } from 'primeng/inputtext';
import { FooterComponent } from 'app/shared/Components/footer/footer.component';
import { NgIf } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { InputComponent } from "../input/input.component";

@NgModule({
    declarations: [
        AuthForgotPasswordComponent
    ],
    imports: [
    RouterModule.forChild(authForgotPasswordRoutes),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FuseCardModule,
    FuseAlertModule,
    FooterComponent,
    NgIf,
    TranslocoModule,
    InputTextModule,
    InputComponent
]
})
export class AuthForgotPasswordModule
{
}
