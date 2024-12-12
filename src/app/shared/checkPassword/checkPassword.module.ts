import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckPasswordComponent } from './checkPassword.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    declarations: [
     CheckPasswordComponent
    ],
    imports: [
        CommonModule,
        TranslocoModule
    ],
    exports:[CheckPasswordComponent]
})
export class  CheckPaswordModule{ }
