import { ApplicationUserDTO, SelectItem } from './../../../../nswag-api-auth';
import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { SpService } from 'app/core/services/sp.service';

import { SpSelectItems } from 'app/modules/admin/sps/SpSelectItems';
import { SignUpService } from './sign-up.service';
import { MatDialog } from '@angular/material/dialog';
import {
    MAT_DATE_FORMATS,
    NativeDateAdapter,
} from '@angular/material/core';
import { formsData } from '../input/input.component';

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};
@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    providers: [
        NativeDateAdapter,
        {
            provide: MAT_DATE_FORMATS,
            useValue: MY_FORMATS,
        },
    ],
    animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('heroForm') public heroForm;

    applicationUser = new ApplicationUserDTO();
    districtSelItem: any;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    password_confirm: string;

    minDate = new Date('2008-01-01');
    maxDate = new Date('2017-01-01');
    organizations: SelectItem[];
    /**
     * Constructor
     */
    constructor(
        public spService: SpService,
        public singUpService: SignUpService,
        public matdialog: MatDialog,
    ) {}
    active = 0;
    activeIndex = 0;
    isFillFormContinue = false;
    formsData: formsData[] = [
        {
            label: 'personSurname',
            nameFormControl: 'surname',
            placeholder:'isSurname',
            matIcon:'userLanding'
        },
        {
            label: 'personName',
            nameFormControl: 'name',
            placeholder:'name',
            matIcon:'userLanding'
        },
    ];
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.spService.GetSpByTableName(
            SpSelectItems.Sex,
            SpSelectItems.SPRegions,
            SpSelectItems.SPDistricts,
            SpSelectItems.Nations,
            SpSelectItems.UserTypes
        );
        this.singUpService.selItem.applicationUserId = this.applicationUser.id;
        this.singUpService.access.get('spCountryId').disable();
        this.singUpService.access.get('spSexId').setValue('1');
        this.singUpService.access.valueChanges.subscribe(res=>{
            if(res.surname && res.name && res.birthDate)
            {
                this.isFillFormContinue = true;
            }
        })
    }
    changeFormValidator() {
        let spRegionId = this.singUpService.access.get('spRegionId');
        let spDistrictId = this.singUpService.access.get('spDistrictId');
        let spCountryId = this.singUpService.access.get('spCountryId');
        if (this.active==0) {
            this.singUpService.isCitizenUzbekistan = true;
            spRegionId.enable();
            spDistrictId.enable();
            spCountryId.disable();
        } else {
            this.singUpService.isCitizenUzbekistan = false;
            spRegionId.disable();
            spDistrictId.disable();
            spCountryId.enable();
        }
    }
}
