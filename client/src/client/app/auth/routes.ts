import { ForgotComponent } from './+forgot/index';
import { LoginComponent} from './+login/index';
import { RouterConfig } from '@angular/router';
import { SignupComponent } from './+signup/index';

export const AuthRoutes: RouterConfig = [
  {
    path: 'forgot',
    component: ForgotComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];
