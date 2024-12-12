import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { SpService } from 'app/core/services/sp.service';
import { SelectItem, SelectItemClient } from 'nswag-api/nswag-api-sps';
import { map } from 'rxjs';
import { SignUpService } from '../sign-up.service';
import { formsData } from '../../input/input.component';

@Component({
    selector: 'app-foreign-country',
    templateUrl: './foreign-country.component.html',
    styleUrls: ['./foreign-country.component.css'],
})
export class ForeignCountryComponent implements OnInit {
    @Output() backToPrevious = new EventEmitter<boolean>()
    formsData:formsData[]=[
    {
        label:'email',
        nameFormControl:'email',
        placeholder:'email',
        matIcon:'mailFooter',
    },
]

    countries: any;
    constructor(
        public spService: SpService,
        public fb: FormBuilder,
        private forCountry: SelectItemClient,
        public signUpService: SignUpService
    ) {}
    foreignUser: FormGroup;
    ngOnInit() {
        this.forCountry
            .getSelectItems('Countries')
            .pipe(map((x) => x.slice(1)))
            .subscribe((res) => {
                this.countries = res;
            });
    }
    backTo()
    {
        this.backToPrevious.emit(true)
    }
}
