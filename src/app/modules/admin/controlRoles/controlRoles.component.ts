import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpService } from 'app/core/services/sp.service';
import { AccountClient, SelectItem, TableMetaData, UserRegistrDTO } from 'nswag-api/nswag-api-auth';
import { FilesClient } from 'nswag-api/nswag-api-marathon';
import { SpSelectItems } from '../sps/SpSelectItems';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-controlRoles',
    templateUrl: './controlRoles.component.html',
    styleUrls: ['./controlRoles.component.css'],
    standalone:true,
    imports:[TableModule, TranslocoModule, InputTextModule, FormsModule, ButtonModule]
})
export default class ControlRolesComponent implements OnInit {
    totalItems: number;
    rolesList: UserRegistrDTO[];
    roles = new Map<number, string>();
    userName = ''
    fullName = ''
    email = '';
    phone = '';
    spRoles: SelectItem[];
    spBindingRole: null;
    constructor(
        private accountClient: AccountClient,
        private fileClient: FilesClient,
        private dialog: MatDialog,
        private spService: SpService
    ) {}
    tableFilter: TableMetaData = {} as TableMetaData;
    ngOnInit() {
        this.spService.GetSpByTableName(SpSelectItems.UserTypes);
        this.loadFeedBack(
            new TableMetaData({
                first: 0,
                rows: 10,
                filters: '',
                sortOrder: 0,
            })
        );
        this.spService
            .SpByTableNameSubscribable(SpSelectItems.UserTypes)
            .subscribe((res) => {
                this.spRoles = res
                for (let x of res) {
                    this.roles.set(+x.value, x.label);
                }
            });
    }
    loadFeedBack(event) {
        for (const [key, value] of Object.entries(event.filters)) {
            if(event.filters[key].value==null){
                delete event.filters[key];
            }
          }
        this.tableFilter = Object.assign(this.tableFilter, event);
        this.tableFilter.filters = JSON.stringify(this.tableFilter.filters);
        this.accountClient
            .getUserApplicationStatusList(this.tableFilter)
            .subscribe((reponse) => {
                this.rolesList = reponse.items;
                this.totalItems = reponse.totalItems;
            });
    }
    fileDownload(id: string) {
        this.fileClient.getImageByIdFromFolderInBase64(id).subscribe((res) => {
            const downloadLink = document.createElement('a');
            const fileName = 'sample';
            downloadLink.href = res;
            downloadLink.download = fileName;
            downloadLink.click();
        });
    }
    blockUserRole(id: string, index: number) {
        this.accountClient.userApplicationNotAllow(id).subscribe((res) => {
            this.rolesList.splice(index, 1);
        });
    }
    allowUserRole(id: string, index: number) {
        this.accountClient.userApplicationAllow(id).subscribe((res) => {
            this.rolesList.splice(index, 1);
        });
    }

    clear(table: Table) {
      this.userName = ''
      this.fullName = ''
      this.email = '';
      this.phone = '';
      this.spBindingRole = null;
      table.clear();
  }
}
