import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgStructureComponent } from './org-structure.component';
import { RouterModule, Routes } from '@angular/router';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { OrgTreeComponent } from './org-tree/org-tree.component';
import { OrgFormComponent } from './org-form/org-form.component';
const routes: Routes = [
    {
        path: '',
        component: OrgStructureComponent,
    },
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [
        OrgStructureComponent,
        OrgChartComponent,
        OrgTreeComponent,
        OrgFormComponent,
    ],
})
export class OrgStructureModule {}
