import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectItem, SelectItemClient, TableMetaData } from 'nswag-api-sps';
import { TranslocoModule } from '@ngneat/transloco';

import { Table, TableModule } from 'primeng/table';
import { SelectApplicationUser, SuperAdminClient } from 'nswag-api-auth';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';


export interface addUser {
    Name: string;
    Surname: string;
    Patronymic: string;
    PINFL: string;
    BirthDate: string;
    SpSexId: string;
    Region: string;
    PhoneMain: string;
    EMail: string;
}

export interface country {
    label: string;
    value: number;
}

@Component({
  selector: 'app-organizationControl',
  templateUrl: './organizationControl.component.html',
  styleUrls: ['./organizationControl.component.css'],
  standalone:true,
  imports: [TableModule, TranslocoModule, DropdownModule, InputTextModule,
    FormsModule, ReactiveFormsModule, RouterModule, ButtonModule,TooltipModule,
     InputIconModule, IconFieldModule ]
})
export default class OrganizationControlComponent implements OnInit {

    athletes: SelectApplicationUser[];

    isFilterShow: boolean;
    organizaitons: SelectItem[];

    constructor(
        private superAdmin: SuperAdminClient,
        private spService: SelectItemClient,
        private fb: FormBuilder,
        private _router:Router
    ) {
    }

    filterForm = this.fb.group({
        userName:[''],
        fullName:[''],
        orgname:[''],
        orgtype:[],
        email:[''],
        phone:['']
    })

    tableFilter: TableMetaData = {} as TableMetaData;

    totalItems:number;

    selectFilter='';

    ngOnInit() {
        this.spService.getSelectItems('OrganizationType').subscribe(res=>{
            this.organizaitons = res
        })
        this.filterForm.valueChanges.subscribe(res=>{
            if(res.userName || res.fullName || res.orgname || res.orgtype || res.phone || res.email)
            {
                this.isFilterShow = true;
            }
            else{
                this.isFilterShow = false
            }
        })
    }
    loadAthletes(event)
    {
        for (const [key, value] of Object.entries(event.filters)) {
            if(event.filters[key]?.value==null){
                delete event.filters[key];
            }
          }
        this.tableFilter = Object.assign(this.tableFilter, event);
        this.tableFilter.filters = JSON.stringify(this.tableFilter.filters);
        this.superAdmin.getAllOrganizators(this.tableFilter).subscribe(res=>{
            this.totalItems = res.result.totalItems;
            this.athletes = res.result.items;
        })
    }
    filterClean(dt:Table)
    {
        this.selectFilter = ''
        this.filterForm.get('userName').setValue('')
        this.filterForm.get('fullName').setValue('')
        this.filterForm.get('orgname').setValue('')
        this.filterForm.get('orgtype').setValue('')
        this.filterForm.get('phone').setValue('')
        this.filterForm.get('email').setValue('');
        dt.clear();
        this.loadAthletes(new TableMetaData({
            first: 0,
            rows:10,
            filters:'',
            sortOrder:0
        }))
    }
}
