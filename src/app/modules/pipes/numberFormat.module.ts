import { NgModule } from '@angular/core';
import { NumberFormatPipe } from './numberFormat';
import { WordBreakPipe } from './wordBreak.pipe';

@NgModule({
    declarations: [
        NumberFormatPipe,
   ],
    exports:[NumberFormatPipe]
})
export class  NumberFormatPipeModule{ }
