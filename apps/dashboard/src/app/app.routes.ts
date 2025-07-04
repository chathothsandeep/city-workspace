import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { TenantComponent } from './tenant/tenant.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { DashboardLayout } from './layouts/dashboard.layout';
import { MinimalLayout } from './layouts/minimal.layout';
import { Products } from './product/products';
import { ProductInfo } from './product/info/productInfo.component';
import { CreateProduct } from './product/create/addProduct.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: '',
        title: 'Dashboard',
        component: HomeComponent,
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            title: 'Products',
            component: Products,
          },
          {
            path: 'create',
            title: 'Create Product',
            component: CreateProduct,
          },
          {
            path: 'info/:id',
            title: 'Product Details',
            component: ProductInfo,
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: MinimalLayout,
    children: [
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
  //   {
  //     path: '**',
  //     redirectTo: 'login',
  //     pathMatch: 'full',
  //     data: { regex: '^((?!uploads/.*).)*$' },
  //   },
];
