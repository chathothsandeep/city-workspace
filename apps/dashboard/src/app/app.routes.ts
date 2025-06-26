import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { TenantComponent } from './tenant/tenant.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { DashboardLayout } from './layouts/dashboard.layout';
import { MinimalLayout } from './layouts/minimal.layout';

export const appRoutes: Route[] = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      //   {
      //     path: 'dashboard',
      //     loadChildren: () =>
      //       import('./pages/dashboard/dashboard.module').then(
      //         (m) => m.DashboardModule,
      //       ),
      //   },
      {
        path: '',
        title: 'Dashboard',
        component: HomeComponent,
      },
    ],
  },
  {
    path: '',
    component: MinimalLayout,
    children: [
      //   {
      //     path: 'login',
      //     loadChildren: () =>
      //       import('./pages/login/login.module').then((m) => m.LoginModule),
      //   },
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
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
