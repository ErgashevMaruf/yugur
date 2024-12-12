import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
    declarations: [
     CheckboxComponent
    ],
    imports: [
        CommonModule,
        TranslocoModule
    ],
    exports:[CheckboxComponent]
})
export class  CheckboxModule{ }
