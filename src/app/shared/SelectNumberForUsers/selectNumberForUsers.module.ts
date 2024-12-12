import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectNumberComponent } from './selectNumber.component';
import { NumberFormatPipeModule } from 'app/modules/pipes/numberFormat.module';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';

@NgModule({
    declarations: [
        SelectNumberComponent,
    ],
    imports: [
        CommonModule,
        TranslocoModule,
        FormsModule,
        ReactiveFormsModule,
        NumberFormatPipeModule,
        CheckboxModule,
        DropdownModule,
        TranslateAsyncPipe
    ],
    exports:[SelectNumberComponent]
})
export class SelectNumberForUsers {}
