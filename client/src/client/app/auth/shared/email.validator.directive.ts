import {Directive} from '@angular/core';
import {Validator, FormControl} from '@angular/forms';
@Directive({
  selector: '[dEmail]'
})
export class EmailValidatorDirective implements Validator {
    static validate(control: FormControl): {[key: string]: boolean} {
        let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (control.value === '' || re.test(control.value)) {
            return null;
        }
        return {email: true};
    }

    validate(control: FormControl): {[key: string]: boolean} {
        return EmailValidatorDirective.validate(control);
    }
}
