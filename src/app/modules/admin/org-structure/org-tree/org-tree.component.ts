import { Component, OnInit } from '@angular/core';
import { FuseLoadingService } from '@fuse/services/loading';
import { OrgStrucClient, OrgStructureDTO } from 'nswag-api-docflow';
import { TreeNode } from 'primeng/api';
import { OrgStructureService } from '../org-structure.service';

@Component({
    selector: 'app-org-tree',
    templateUrl: './org-tree.component.html',
    styleUrls: ['./org-tree.component.css'],
})
export class OrgTreeComponent implements OnInit {
    constructor(
        private _fuseProgressBarService: FuseLoadingService,
        private orgStructClient: OrgStrucClient,
        private orgStructureService: OrgStructureService
    ) {}
    treeData: OrgStructureDTO[]; //Данные для дерева Организационной структуры
    selectedNode: OrgStructureDTO = new OrgStructureDTO();
    ngOnInit() {
        this.refreshSchema();
    }
    refreshSchema() {
        this._fuseProgressBarService.show();
        this.orgStructClient.getDiagOrgStruc(0).subscribe((item) => {
            this.treeData = this.orgStructureService.mapOrgLabel(item, false);
            this._fuseProgressBarService.hide();
        });
    }
    onCloseDialog($event) {
        this.refreshSchema();
        this.selectedNode = new OrgStructureDTO();
    }
    onNodeSelect($event) {
        
    }
}
