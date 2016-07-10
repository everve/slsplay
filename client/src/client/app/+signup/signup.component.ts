import {Component, ElementRef, Renderer, AfterContentInit, OnInit} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, Validators} from '@angular/common';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {Auth} from 'ng2-ui-auth';
import {NgMessages} from '../formComponents/ngMessages';
import {EmailValidator} from '../formComponents/customValidators';
import {PasswordMatchValidator} from '../formComponents/customValidators';

export interface ISignup {
    email: string;
    password: string;
}
@Component({
    selector: 'sd-signup',
    templateUrl: 'app/+signup/signup.component.html',
    styleUrls: ['app/+signup/signup.component.css'],
    directives: [NgMessages, ROUTER_DIRECTIVES, FORM_DIRECTIVES, EmailValidator, PasswordMatchValidator],
})
export class SignupComponent implements AfterContentInit, OnInit {
    user: any = {};
    form: ControlGroup;
    signup() {
        this.auth.signup({email: this.user.email, password: this.user.password})
            .subscribe(() => {
                this.auth.login({email: this.user.email, password: this.user.password})
                    .subscribe(() => {
                        if (this.auth.isAuthenticated()) {
                            this.router.navigate(['Main']);
                        }
                    });
            });
    }
    ngAfterContentInit(): any {
        this.renderer.setElementClass(this.element.nativeElement, 'app', true);
    }
    ngOnInit() {
        this.form = this.fb.group({
            displayName: new Control('', Validators.compose([Validators.required, Validators.maxLength(32)])),
            email: new Control('', Validators.compose([Validators.required, EmailValidator.validate])),
            passwordGroup: new ControlGroup(
                {
                    password: new Control('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(32)])),
                    confirmPassword: new Control('')
                },
                null,
                PasswordMatchValidator.validate
            )
        });
    }
    constructor(private auth: Auth,
                private router: Router,
                private element: ElementRef,
                private renderer: Renderer,
                private fb: FormBuilder) {

    }
}