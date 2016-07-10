import {Component, AfterContentInit, ElementRef, Renderer, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Control, Validators} from '@angular/common';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {Auth} from 'ng2-ui-auth';
import {NgMessagesComponent} from '../formComponents/ngMessages';
import {EmailValidatorDirective} from '../formComponents/customValidators';

@Component({
    selector: 'app-login',
    styleUrls: ['app/+login/login.component.css'],
    templateUrl: 'app/+login/login.component.html',
    directives: [NgMessagesComponent, ROUTER_DIRECTIVES, EmailValidatorDirective],
})
export class LoginComponent implements AfterContentInit, OnInit {
    user = {email: '', password: ''};
    form: ControlGroup;

    login() {
        this.auth.login(this.user)
            .subscribe(() => this.goToMain());
    }

    authenticate(provider: string) {
        this.auth.authenticate(provider)
            .subscribe(() => this.goToMain());
    }

    goToMain() {
        this.router.navigate(['Main']);
    }

    ngAfterContentInit() {
        this.renderer.setElementClass(this.element.nativeElement, 'app', true);
        if (this.auth.isAuthenticated()) {
            this.goToMain();
        }
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: new Control('', Validators.compose([Validators.required, EmailValidatorDirective.validate])),
            password: new Control('', Validators.required)
        });
    }

    constructor(private auth: Auth,
                private router: Router,
                private element: ElementRef,
                private renderer: Renderer,
                private fb: FormBuilder) {
    }
}
