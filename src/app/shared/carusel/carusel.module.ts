import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { CaruselComponent } from './carusel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';

@NgModule({
    declarations: [
        CaruselComponent
    ],
    imports: [
        CommonModule,
        TranslocoModule,
        MatIconModule,
        MatTooltipModule,
        TooltipModule,
        TranslateAsyncPipe
    ],
    exports:[CaruselComponent]
})
export class CaruselModule {}
