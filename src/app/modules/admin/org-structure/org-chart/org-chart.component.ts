import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseLoadingService } from '@fuse/services/loading';
import { SpService } from 'app/core/services/sp.service';
import {
    OrgStrucClient,
    OrgStructureDTO,
    TypeOrgStructure,
} from 'nswag-api/nswag-api-docflow';
import { TreeNode } from 'primeng/api';
import { SpSelectItems } from '../../sps/SpSelectItems';
import { MouseScroll } from '../MouseScroll';
import { OrgStructureService } from '../org-structure.service';

@Component({
    selector: 'app-org-chart',
    templateUrl: './org-chart.component.html',
    styleUrls: ['./org-chart.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class OrgChartComponent implements OnInit {
    constructor(
        private _fuseProgressBarService: FuseLoadingService,
        private orgStructClient: OrgStrucClient,
        private spService: SpService,
        private orgStructureService: OrgStructureService
    ) {}
    listItems: OrgStructureDTO[];
    selectedNode: OrgStructureDTO = new OrgStructureDTO();
    rootId: number = 0;
    mouseScroll: MouseScroll = new MouseScroll();
    ngOnInit() {
        this.spService.GetSpByTableName(
            SpSelectItems.Institutions,
            SpSelectItems.Departments,
            SpSelectItems.Positions,
            SpSelectItems.SPRegions,
            SpSelectItems.SPDistricts
        );
        this.spService.GetStaffs();
        this.refreshSchema();
    }
    //Выбор из текущей ветки
    getRootNodeCurrent() {
        this.rootId = this.selectedNode.id;
        this.refreshSchema();
    }

    refreshSchema() {
        this._fuseProgressBarService.show();
        this.orgStructClient.getDiagOrgStruc(this.rootId).subscribe((item) => {
            this.listItems = this.orgStructureService.mapOrgLabel(item);
            this._fuseProgressBarService.hide();
        });
    }

    onCloseDialog($event) {
        this.refreshSchema();
        this.selectedNode = new OrgStructureDTO();
    }
}
