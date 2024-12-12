import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationTreeComponent } from './navigation-tree.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationFormComponent } from './navigation-form/navigation-form.component';
import { NavigationListComponent } from './navigation-list/navigation-list.component';
import { DialogModule } from 'primeng/dialog';
import { SplitterModule } from 'primeng/splitter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from 'app/shared/shared.module';
const routes: Routes = [
    {
        path: '',
        component: NavigationTreeComponent,
    },
];
@NgModule({
    imports: [CommonModule,
        DialogModule,
        SplitterModule,
        DialogModule,
        MatFormFieldModule,
        RouterModule.forChild(routes),
        MatSelectModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        TreeSelectModule,
        TreeTableModule,
        MatSlideToggleModule,
        SharedModule
    ],

    declarations: [
        NavigationTreeComponent,
        NavigationFormComponent,
        NavigationListComponent,
    ],
})
export class NavigationTreeModule {}
