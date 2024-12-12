import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectnumberComponent } from './selectnumber.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
   
  ],
  declarations: [SelectnumberComponent],
  exports:[SelectnumberComponent]
})
export class SelectCategoryNumberModule { }
