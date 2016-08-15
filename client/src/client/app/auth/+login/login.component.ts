import {EmailValidatorDirective, AuthMessageComponent} from '../shared/index';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Component, Renderer, AfterContentInit, OnInit, ElementRef} from '@angular/core';
import {Validators, FormBuilder, FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {AuthService} from '../../shared/auth/auth-service';

@Component({
  moduleId: module.id,
  selector: 'meet-login',
  styleUrls: ['login.component.css'],
  templateUrl: 'login.component.html',
  directives: [AuthMessageComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, EmailValidatorDirective]
})
export class LoginComponent implements AfterContentInit, OnInit {
  user = {email: '', password: ''};
  form:FormGroup;

  constructor(private auth:AuthService,
              private router:Router,
              private element:ElementRef,
              private renderer:Renderer,
              private fb:FormBuilder) {
  }

  login() {
    this.auth.login(this.form.value)
      .do(() => this.goToMain());
  }

  authenticate(provider:string) {
    this.auth.authenticate(provider)
      .do(() => this.goToMain());
  }

  ngAfterContentInit() {
    this.renderer.setElementClass(this.element.nativeElement, 'app', true); //todo why?
    if (this.auth.isAuthenticated()) {
      this.goToMain();
    }
  }

  goToMain() {
    this.router.navigate(['meet']); //todo confirm.
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required, EmailValidatorDirective.validate])),
      password: new FormControl('', Validators.required)
    });
  }
}
