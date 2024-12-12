import { NgModule } from '@angular/core';
import { SpsComponent } from './sps.component';
import { RouterModule, Routes } from '@angular/router';
import { SpBaseListComponent } from './sp-base-table/sp-base-list/sp-base-list.component';
import { SpBaseFormComponent } from './sp-base-table/sp-base-form/sp-base-form.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SplitterModule } from 'primeng/splitter';
import { MatIconModule } from '@angular/material/icon';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
const routes: Routes = [
    {
        path: '',
        component: SpsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), TableModule, SharedModule,
        MatFormFieldModule, SplitterModule,
        MatIconModule, ProgressSpinnerModule,
        MatInputModule,MatDialogModule,
        CommonModule,MatSelectModule, MatButtonModule, MatSlideToggleModule
    ],
    declarations: [SpsComponent, SpBaseListComponent, SpBaseFormComponent],
})
export class SpsModule {}
