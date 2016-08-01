import {Auth} from 'ng2-ui-auth';
import {NgMessagesComponent} from '../formComponents/ngMessages';
import {EmailValidatorDirective} from '../formComponents/customValidators';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Component, Renderer, AfterContentInit, OnInit, ElementRef} from '@angular/core';
import {Validators, FormBuilder, FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

@Component({
    selector: 'app-login',
    styleUrls: ['app/+login/login.component.css'],
    templateUrl: 'app/+login/login.component.html',
    directives: [NgMessagesComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, EmailValidatorDirective],
})
export class LoginComponent implements AfterContentInit, OnInit {
    user = {email: '', password: ''};
    form: FormGroup;

    login() {
        this.auth.login(this.form.value)
            .subscribe(() => this.goToMain());
    }

    authenticate(provider: string) {
        this.auth.authenticate(provider)
            .subscribe(() => this.goToMain());
    }

    goToMain() {
        this.router.navigate(['meet']); //todo confirm.
    }

    ngAfterContentInit() {
        this.renderer.setElementClass(this.element.nativeElement, 'app', true);
        if (this.auth.isAuthenticated()) {
            this.goToMain();
        }
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: new FormControl('', Validators.compose([Validators.required, EmailValidatorDirective.validate])),
            password: new FormControl('', Validators.required)
        });
    }

    constructor(private auth: Auth,
                private router: Router,
                private element: ElementRef,
                private renderer: Renderer,
                private fb: FormBuilder) {
    }
}
