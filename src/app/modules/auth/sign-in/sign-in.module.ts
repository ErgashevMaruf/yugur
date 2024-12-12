import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { authSignInRoutes } from 'app/modules/auth/sign-in/sign-in.routing';
import { CheckboxModule } from 'app/shared/checkbox/checkbox.module';
import { InputComponent } from '../input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    declarations: [AuthSignInComponent],
    imports: [
        RouterModule.forChild(authSignInRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        CheckboxModule,
        InputComponent,
        FormsModule,
        NgClass,
        TranslocoModule,
        ReactiveFormsModule
    ],
})
export class AuthSignInModule {}
