import {EmailValidatorDirective, AuthMessageComponent} from '../shared/index';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Component, Renderer, AfterContentInit, OnInit, ElementRef} from '@angular/core';
import {Validators, FormBuilder, FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {AuthService} from '../../shared/auth/auth-service';

@Component({
    moduleId: module.id,
    selector: 'meet-forgot',
    styleUrls: ['forgot.component.css'],
    templateUrl: 'forgot.component.html',
    directives: [AuthMessageComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, EmailValidatorDirective]
})
export class ForgotComponent implements AfterContentInit, OnInit {
    user = {email: ''};
    form: FormGroup;

    forgot() {
        this.auth.forgot(this.form.value)
            .subscribe(() => this.goToReset());
    }

    ngAfterContentInit() {
        this.renderer.setElementClass(this.element.nativeElement, 'app', true);
    }

    goToReset() {
      this.router.navigate(['reset']);
    }


  ngOnInit() {
        this.form = this.fb.group({
          email: new FormControl('', Validators.compose([Validators.required, EmailValidatorDirective.validate]))});
    }

    constructor(private auth: AuthService,
                private router: Router,
                private element: ElementRef,
                private renderer: Renderer,
                private fb: FormBuilder) {
    }
}
