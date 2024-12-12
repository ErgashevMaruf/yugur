import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SpService } from 'app/core/services/sp.service';
import {
    OrgStrucClient,
    OrgStructureDTO,
    TypeOrgStructure,
} from 'nswag-api-docflow';
import { OrgFormItem } from '../org-structure.service';
import { HelperService } from 'app/shared/helper.service';

@Component({
    selector: 'app-org-form',
    templateUrl: './org-form.component.html',
    styleUrls: ['./org-form.component.css'],
})
export class OrgFormComponent implements OnInit {
    constructor(
        public spService: SpService,
        private orgStrucClient: OrgStrucClient,
        private helperService: HelperService
    ) {}
    displayDialog: boolean = false;
    selectedNode: OrgStructureDTO;
    @Output() closeModalWindow: EventEmitter<boolean> =
        new EventEmitter<boolean>();
    @Output() chooseNodeFromCurrent: EventEmitter<number> =
        new EventEmitter<number>();

    orgFormItem: OrgFormItem = new OrgFormItem();
    ngOnInit() {}
    onNodeSelect(event) {
        this.orgFormItem = new OrgFormItem();
        this.selectedNode = event.node;
        //Вывод всех департаментов

        this.displayDialog = true;
    }
    onChooseNodeFromCurrent() {
        this.chooseNodeFromCurrent.emit();
        this.onCloseModalWindow(false);
    }
    onDelete() {
        this.orgStrucClient
            .deleteOrgStructItem(this.selectedNode.id)
            .subscribe((x) => {
                if (!x) {
                    this.helperService.showMessage(
                        'Не получилось удалить. Имеются дочерние элементы!'
                    );
                }
                this.onCloseModalWindow(false);
            });
    }
    onCloseModalWindow(value: boolean) {
        this.displayDialog = false;
        this.closeModalWindow.emit(value);
    }
    onSaveHosp(item: string) {
        this.selectedNode.rootId = this.selectedNode.id;
        this.selectedNode.id = 0;
        this.selectedNode.staffId = null;
        this.selectedNode.spPositionId = null;
        switch (item) {
            case 'Hosp':
                this.selectedNode.spInstitutionId =
                    +this.orgFormItem.selInsitutionId;
                this.selectedNode.typeOrgStruct = TypeOrgStructure.Institution;
                break;
            case 'Dep':
                this.selectedNode.spDepartmentId =
                    +this.orgFormItem.selSpDepartmentId;
                this.selectedNode.typeOrgStruct = TypeOrgStructure.Department;
                break;
            case 'Position':
                this.selectedNode.spPositionId =
                    +this.orgFormItem.selSpPositionId;
                this.selectedNode.typeOrgStruct = TypeOrgStructure.Position;
                break;
            case 'Per':
                this.selectedNode.staffId = +this.orgFormItem.selStaffId;
                this.selectedNode.typeOrgStruct = TypeOrgStructure.Staff;
                break;
            case 'AddWhoseDocToSee':
            // this.vUserService
            //     .addTbPositionAccessToPosition(
            //         this.selectedNode.spPositionId.toString(),
            //         this.selPositionOfMainLookPerson
            //     )
            //     .subscribe((item) => {
            //         this.refreshMainLookPositions();
            //     });
            // return;
        }
        this.orgStrucClient
            .addUpdateOrgStruct(this.selectedNode)
            .subscribe((item) => {
                this.helperService.showSuccessSave();
                this.onCloseModalWindow(false);
            });
    }
}
