import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeSwitchComponent } from './theme-switch.component';
import { WebUrl } from '../../lib/constants/url.constants';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../lib/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AppConstants } from '../../lib/constants/app.constants';
import { TenantService } from '../tenant/tenant.service';
import { TenantEntity } from '@city-workspace/shared-models';
import { AlertService } from '../../lib/services/alert.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ThemeSwitchComponent, ButtonModule],
  template: `
    <header
      class="header flex flex-row justify-between py-4 px-6  items-center border-b border-gray-100 dark:border-gray-700"
    >
      <div>
        @if (tenant) {
          <h1 class="text-2xl">{{ tenant.name }}</h1>
        }
      </div>

      <nav class="flex flex-row gap-4">
        @if (authService.loginStatus()) {
          <p-button label="Logout" variant="text" (click)="onLogout()" />
        } @else {
          <p-button label="Login" variant="text" (click)="onLogin()" />
        }
        <app-theme-switch></app-theme-switch>
      </nav>
    </header>
  `,
})
export class HeaderComponent implements OnInit {
  webUrl = WebUrl;
  private router = inject(Router);
  authService = inject(AuthService);
  cookie = inject(CookieService);
  tenantId: string | undefined = undefined;
  tenatService = inject(TenantService);
  tenant?: TenantEntity | null = null;
  private alertService = inject(AlertService);

  ngOnInit(): void {
    this.tenantId = this.cookie.get(AppConstants.tenantId);
    this.authService.checkLoginStatus();
    this.getTenantData();
  }

  getTenantData() {
    if (this.tenantId) {
      this.tenatService.getTenantInfo(Number(this.tenantId)).subscribe({
        next: (tenant) => {
          this.tenant = tenant;
        },
        error: (error) => {
          const errorMessage = error.error.message?.message || error;
          this.alertService.showError(JSON.stringify(errorMessage));
        },
      });
    }
  }

  async onLogout() {
    this.authService.logout();
    await this.router.navigate([WebUrl.signin]);
  }

  async onLogin() {
    await this.router.navigate([WebUrl.signin]);
  }
}
