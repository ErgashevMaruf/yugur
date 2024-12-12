import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-checkPassword',
    templateUrl: './checkPassword.component.html',
    styleUrls: ['./checkPassword.component.css'],
})
export class CheckPasswordComponent implements OnInit {
    countValidation = 0;
    @Input() form: FormGroup;
    ngOnInit(): void {
        this.form.get('password').valueChanges.subscribe((res) => {
            this.countValidation = 0;
            let upperCaseCharacters = /[A-Z]+/g;
            let lowerCaseCharacters = /[a-z]+/g;
            let numberCharacters = /[0-9]+/g;
            let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
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
