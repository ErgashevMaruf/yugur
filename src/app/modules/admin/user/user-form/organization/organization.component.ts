import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SPClient, SelectItem, SelectItemClient } from 'nswag-api/nswag-api-sps';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  organizers: SelectItem[];
  organizaitonInfo:FormGroup;
  constructor(private spClient:SelectItemClient,
    private fb:FormBuilder,
    private matdialog: MatDialogRef<OrganizationComponent>
) { }

  ngOnInit() {
    this.spClient.getSelectItems('OrganizationType').subscribe(res=>{
        this.organizers = res.slice(1);
        let index = this.organizers.findIndex(el=>+el.value==4);
        this.organizers.splice(index,1);
    })
    this.organizaitonInfo = this.fb.group({
        name: ['', Validators.required],
        spOrganizationTypeId: ['', Validators.required]
    })
  }
  sendOrganizationInfo()
  {
    this.matdialog.close(this.organizaitonInfo.value)
  }

}
