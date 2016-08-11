import {Auth} from 'ng2-ui-auth';
import {NgMessagesComponent} from '../formComponents/ngMessages';
import {EmailValidatorDirective, PasswordMatchValidatorDirective} from '../formComponents/customValidators';
import {AfterContentInit, OnInit, Component, ElementRef, Renderer} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Validators, FormControl, FormBuilder, FormGroup, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

export interface ISignup {
  email:string;
  password:string;
}
@Component({
  moduleId: module.id,
  selector: 'sd-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
  directives: [NgMessagesComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, EmailValidatorDirective, PasswordMatchValidatorDirective],
})
export class SignupComponent implements AfterContentInit, OnInit {
  form:FormGroup;
  signup() {
    const authInfo = {email: this.form.value.email, password: this.form.value.passwordGroup.password};
    this.auth.signup(authInfo)
      .subscribe(() => {
        this.auth.login(authInfo)
          .subscribe(() => {
            if (this.auth.isAuthenticated()) {
              this.router.navigate(['meet']);
            }
          });
      });
  }

  ngAfterContentInit():any {
    this.renderer.setElementClass(this.element.nativeElement, 'app', true);
  }

  ngOnInit() {
    this.form = this.fb.group({
      displayName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(32)])),
      email: new FormControl('', Validators.compose([Validators.required, EmailValidatorDirective.validate])),
      passwordGroup: new FormGroup(
        {
          password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(32)])),
          confirmPassword: new FormControl('')
        },
        null,
        PasswordMatchValidatorDirective.validate
      )
    });
  }

  constructor(private auth:Auth,
              private router:Router,
              private element:ElementRef,
              private renderer:Renderer,
              private fb:FormBuilder) {

  }
}
