import { Component, Input, OnInit } from '@angular/core';
import { SignUpService } from '../sign-up.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { upperCase } from 'lodash';
import { MaskService } from 'app/modules/services/mask.service';
import { formsData } from '../../input/input.component';

@Component({
    selector: 'app-create-login',
    templateUrl: './create-login.component.html',
    styleUrls: ['./create-login.component.css'],
})
export class CreateLoginComponent implements OnInit {
    phoneMask: string;
    formsData: formsData[] = [
        {
            label: 'userName',
            nameFormControl: 'userName',
            placeholder: 'userName',
        },
        {
            label: 'sign.password',
            nameFormControl: 'password',
            placeholder: 'sign.password',
            type:'password'
        },
        {
            label: 'confirmpassword',
            nameFormControl: 'confirmPassword',
            placeholder: 'confirmpassword',
            type:'password'
        },
    ];
    constructor(
        public signUpService: SignUpService,
        private fb: FormBuilder,
        private maskService: MaskService
    ) {}
    countValidation = 0;
    @Input() showEmail = true;
    ngOnInit() {
        this.phoneMask = this.maskService.phones['+998'];
        this.signUpService.access
            .get('password')
            .valueChanges.subscribe((res) => {
                this.countValidation = 0;
                let upperCaseCharacters = /[A-Z]+/g;
                let lowerCaseCharacters = /[a-z]+/g;
                let numberCharacters = /[0-9]+/g;
                let specialCharacters =
                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                let minlength = /^.{6,}$/;
                if (upperCaseCharacters.test(res)) {
                    this.countValidation++;
                }
                if (lowerCaseCharacters.test(res)) {
                    this.countValidation++;
                }
                if (specialCharacters.test(res)) {
                    this.countValidation++;
                }
                if (minlength.test(res)) {
                    this.countValidation++;
                }
                if (numberCharacters.test(res)) {
                    this.countValidation++;
                }
            });
    }
}
