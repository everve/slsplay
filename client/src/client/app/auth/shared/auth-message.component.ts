import {Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'auth-messages',
    template:
    '<p *ngIf="error" [ngSwitch]="error" class="text-danger help-block">' +
    '<template ngSwitchCase="required">Required</template>' +
    '<template ngSwitchCase="email">Invalid email address</template>' +
    '<template ngSwitchCase="minlength">Too short</template>' +
    '<template ngSwitchCase="maxlength">Too long</template>' +
    '<template ngSwitchCase="passwordMatch">Passwords don&apos;t match</template>' +
    '<template ngSwitchDefault>Validation error</template>' +
    '</p>'
})
export class AuthMessageComponent implements OnChanges {
    error = '';
    @Input() errors: Object;
    ngOnChanges(changes: any): any { //changes looks like this changes.theInputVariable.currentValue/previousValue
        if (changes.errors.currentValue) {
            for (let errorProp of Object.keys(changes.errors.currentValue)) {
                if (changes.errors.currentValue[errorProp]) {
                    this.error = errorProp;
                    break;
                }
            }
        } else {
            this.error = null;
        }
    }
}
