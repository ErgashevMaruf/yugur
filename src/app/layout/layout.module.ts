import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { ClassicLayoutModule } from 'app/layout/layouts/vertical/classic/classic.module';
import { NgClass } from '@angular/common';



@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports     : [
        EmptyLayoutModule,
        ClassicLayoutModule,
        NgClass
    ],
    exports     : [
        LayoutComponent,
        EmptyLayoutModule,
        ClassicLayoutModule,
    ]
})
export class LayoutModule
{
}
