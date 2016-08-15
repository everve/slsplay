import {Directive} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Directive({
    selector: '[dPasswordMatch]'
})
export class PasswordMatchValidatorDirective {
    static validate(control: FormGroup) {
        let firstValue:any = undefined;
        if (Object.keys(control.controls).every((key) => {
                if (firstValue === undefined) {
                    firstValue = control.controls[key].value;
                }
                return control.controls[key].value === firstValue;
            })) {
            return null;
        }
        return {passwordMatch: true};
    }
}
