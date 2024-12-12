import { Injectable } from '@angular/core';
import { SpService } from 'app/core/services/sp.service';
import { StaffClient } from 'nswag-api/nswag-api-auth';
import { OrgStructureDTO, TypeOrgStructure } from 'nswag-api/nswag-api-docflow';
import { FilesInfoClient } from 'nswag-api/nswag-api-files';
import { SpSelectItems } from '../sps/SpSelectItems';

@Injectable({
    providedIn: 'root',
})
export class OrgStructureService {
    constructor(
        private spService: SpService,
        private staffClient: StaffClient,
        private fileClient: FilesInfoClient
    ) {}

    mapOrgLabel(item: OrgStructureDTO[], hasStyleClass: boolean = true) {
        item.map((m) => {
            m = this.labelIdToName(m, hasStyleClass);
            if (m.children) {
                m.children = this.mapOrgLabel(m.children, hasStyleClass);
            }
        });
        return item;
    }

    labelIdToName(item: OrgStructureDTO, hasStyleClass: boolean) {
        if (item.typeOrgStruct == TypeOrgStructure.Institution) {
            item.label = this.spService.filterByValueReturnLabel(
                SpSelectItems.Institutions,
                item.spInstitutionId.toString()
            );
            item.expandedIcon = item.collapsedIcon = 'pi pi-building';
            return item;
        }

        if (item.typeOrgStruct == TypeOrgStructure.Department) {
            item.label = this.spService.filterByValueReturnLabel(
                SpSelectItems.Departments,
                item.spDepartmentId.toString()
            );
            item.styleClass = hasStyleClass ? 'bg-indigo-500 text-white' : '';
            item.expandedIcon = item.collapsedIcon = 'pi pi-users';
            return item;
        }
        if (item.typeOrgStruct == TypeOrgStructure.Position) {
            item.label = this.spService.filterByValueReturnLabel(
                SpSelectItems.Positions,
                item.spPositionId.toString()
            );
            item.styleClass = hasStyleClass ? 'bg-teal-500 text-white' : '';
            item.expandedIcon = item.collapsedIcon = 'pi pi-user-minus';
            return item;
        }
        if (item.typeOrgStruct == TypeOrgStructure.Staff) {
            item.label = this.spService.filterByValueReturnLabel(
                SpSelectItems.Staffs,
                item.staffId.toString()
            );
            item.dataName = this.spService.filterByValueReturnLabel(
                SpSelectItems.Positions,
                item.spPositionId.toString()
            );
            item.label = hasStyleClass
                ? item.label
                : item.label + ' ( ' + item.dataName + ' )';
            this.staffClient.staffById(item.staffId).subscribe((x) => {
                if (x.fileImageId) {
                    this.fileClient
                        .getFileBase64ById(x.fileImageId)
                        .subscribe((f) => {
                            item.dataPicture = f;
                        });
                }
            });
            item.styleClass = hasStyleClass ? 'bg-blue-500 text-white' : '';
            item.expandedIcon = item.collapsedIcon = 'pi pi-user';
            return item;
        }
    }
}
export class OrgFormItem {
    selRegionId: string = '';
    selDistrictId: string = '';
    selInsitutionId: string = '';
    selSpDepartmentId: string = '';
    selSpPositionId: string = '';
    selStaffId: string = '';
    isUserAddedToDep: boolean = false;
}
