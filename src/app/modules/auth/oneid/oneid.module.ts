import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneidComponent } from './oneid.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FuseAlertModule } from '@fuse/components/alert';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { oneIdRoutes } from './oneid.routing';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    MatIconModule,
    FuseAlertModule,
    RouterModule.forChild(oneIdRoutes),
  ],
  declarations: [OneidComponent]
})
export class OneidModule { }
