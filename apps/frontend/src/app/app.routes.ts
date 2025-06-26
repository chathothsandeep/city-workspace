import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { TenantComponent } from './tenant/tenant.component';
import { SubscriptionComponent } from './subscription/subscription.component';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Dashboard',
    component: HomeComponent,
  },
  {
    path: 'signup',
    title: 'Create Account',
    component: SignupComponent,
  },
  {
    path: 'signin',
    title: 'Sign In',
    component: SigninComponent,
  },
  {
    path: 'tenant',
    title: 'Create Tenant',
    component: TenantComponent,
  },
  {
    path: 'subscription',
    title: 'Choose your plan',
    component: SubscriptionComponent,
  },
];
