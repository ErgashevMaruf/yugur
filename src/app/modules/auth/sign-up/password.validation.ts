import { AbstractControl, ValidationErrors } from '@angular/forms';

export const PasswordStrengthValidator = function (
    control: AbstractControl
): ValidationErrors | null {
    let value: string = control.value || '';

    if (!value) {
        return null;
    }

    let upperCaseCharacters = /[A-Z]+/g;
    if (upperCaseCharacters.test(value) === false) {
        return {
            passwordStrength: `text has to contine Upper case characters`,
            index: 1,
        };
    }

    let lowerCaseCharacters = /[a-z]+/g;
    if (lowerCaseCharacters.test(value) === false) {
        return {
            passwordStrength: `text has to contine lower case characters`,
            index: 2,
        };
    }

    let numberCharacters = /[0-9]+/g;
    if (numberCharacters.test(value) === false) {
        return {
            passwordStrength: `text has to contine number characters`,
            index: 3,
        };
    }

    let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialCharacters.test(value) === false) {
        return {
            passwordStrength: `text has to contine special character`,
            index: 4,
        };
    }
    let minlength = /^.{6,}$/;
    if (minlength.test(value) === false) {
        return {
            passwordStrength: `password length min 6`,
            index: 5,
        };
    }
    return null;
};
