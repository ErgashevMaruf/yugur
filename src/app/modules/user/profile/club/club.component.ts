import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'app/core/user/user.service';
import { SpSelectItems } from 'app/modules/admin/sps/SpSelectItems';
import { AccountClient, OrganizationModelDTO, SelectItem, UserApplicationStatus } from 'nswag-api/nswag-api-auth';
import {
    ClubDTO,
} from 'nswag-api/nswag-api-marathon';
import { SelectItemClient } from 'nswag-api/nswag-api-sps';
import { combineLatest } from 'rxjs';
@Component({
    selector: 'app-club',
    templateUrl: './club.component.html',
    styleUrls: ['./club.component.css'],
})
export class ClubComponent implements OnInit {
    clubs: ClubDTO[];
    totalItems: number;
    selectClub: number;
    show = false;
    activeClubs: ClubDTO;
    clubId: number;
    userTypes: SelectItem[];
    organizations: SelectItem[];
    isUserOrganizator=false;
    isParent = false;
    isAdmin=false;


    /**
     *
     */
    constructor(
        private spClient:SelectItemClient,
        private fb:FormBuilder,
        private accountClient:AccountClient,
        private userService:UserService
    ) {}

    requestRole = this.fb.group({
        userType: ['', Validators.required],
        spOrganizationTypeId:[''],
        name:['']
    })

    ngOnInit() {
       this.userService.user$.subscribe(res=>{
         this.isParent = res.mainRole=='Родитель';
       })
       if( this.userService.userInfo.userApplicationStatus==UserApplicationStatus.Default)
        {
            combineLatest([this.spClient.getSelectItems(SpSelectItems.UserTypes),
                this.spClient.getSelectItems('OrganizationType')
            ]).subscribe(res=>{
                this.userTypes = res[0].filter(el=>el.value!=='1');
                this.organizations = res[1];
            })
            this.show = true;
            this.requestRole.get('userType').valueChanges.subscribe(res=>{
                if(+res!==2)
                {
                    this.isUserOrganizator = false
                    this.requestRole.get('spOrganizationTypeId').setValidators([])
                    this.requestRole.get('name').setValidators([])
                }
                else{
                    this.isUserOrganizator = true
                    this.requestRole.get('spOrganizationTypeId').setValidators([Validators.required])
                    this.requestRole.get('name').setValidators([Validators.required])
                }
                    this.requestRole.get('spOrganizationTypeId').updateValueAndValidity()
                    this.requestRole.get('name').updateValueAndValidity()
            })
        }

    }
    sendServer()
    {
        let organizationDTO = new OrganizationModelDTO();
        organizationDTO.spUserTypeId = +this.requestRole.value['userType'];
        if(this.isUserOrganizator)
        {
            organizationDTO.name = this.requestRole.value['name'];
            organizationDTO.spOrganizationTypeId = +this.requestRole.value['spOrganizationTypeId'];
        }
        this.accountClient.userRolChangeRequest(organizationDTO).subscribe(res=>{
            this.show = false;
        })
    }
    permitParentRole(event)
    {
        if(event)
        {
            this.isUserOrganizator = false;
            this.requestRole.reset();
            this.accountClient.userRolChangeRequest(new OrganizationModelDTO({
                spUserTypeId: 2,
                spOrganizationTypeId: 4
            })).subscribe()
        }
    }
}
