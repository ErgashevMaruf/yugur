import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SignUpService } from '../sign-up.service';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';
import { SpService } from 'app/core/services/sp.service';
import { formsData } from '../../input/input.component';
@Component({
    selector: 'app-info-person',
    templateUrl: './info-person.component.html',
    styleUrls: ['./info-person.component.css'],
})
export class InfoPersonComponent implements OnInit {
    @Output() backToPrevious = new EventEmitter<boolean>()
    formsData:formsData[]=[
    {
        label:'email',
        nameFormControl:'email',
        placeholder:'email',
        matIcon:'mailFooter',
    },
]
    inputValue: any;
    constructor(
        public signUpService: SignUpService,
        private fb: FormBuilder,
        public spService: SpService
    ) {}
    access: FormGroup;
    personInfo: FormGroup;
    isOrganizer = true;
    district = [];
    ngOnInit() {}
    changeDistrict(rootCode: number) {
        this.signUpService.access.get('spDistrictId').setValue(null);
        this.district = this.spService.GetDistrict.filter(
            (x) => x.rootCode == rootCode
        );
    }
    backTo()
    {
        this.backToPrevious.emit(true)
    }
}
