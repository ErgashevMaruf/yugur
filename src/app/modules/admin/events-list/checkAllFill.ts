import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function ForbiddenNameValidator(
    formgroup: FormGroup,
    contRolNames: string[]
): ValidatorFn {
    return (control: AbstractControl) => {
        let validatorRequired = control.value ? true : false;
        if (!validatorRequired) {
            for (let x of contRolNames) {
                if (formgroup[x].value) {
                    validatorRequired = true;
                    break;
                }
            }
            return validatorRequired ? null: {musvalid:'error'};
        }
        return null;
    };
}
