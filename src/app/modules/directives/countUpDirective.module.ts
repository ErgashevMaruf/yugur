import { NgModule } from '@angular/core';
import { CountUpDirective } from './countUpDirective';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [			
        CountUpDirective,
   ],
    imports: [
        CommonModule
    ],
    exports:[CountUpDirective]
})
export class CountUpDirectiveModule {}
