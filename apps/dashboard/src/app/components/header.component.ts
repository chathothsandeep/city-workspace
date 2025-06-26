import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ThemeSwitchComponent } from './theme-switch.component';
import { WebUrl } from '../../lib/constants/url.constants';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../lib/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgOptimizedImage,
    ThemeSwitchComponent,
    ButtonModule,
  ],
  template: `
    <header
      class="header w-full flex flex-row justify-between py-4 px-6  items-center mb-6 "
    >
      <div class="w-10 h-10 relative">
        <a [routerLink]="webUrl.home"
          ><img ngSrc="assets/images/logo.png" alt="logo" fill
        /></a>
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

  ngOnInit(): void {
    this.authService.checkLoginStatus();
  }

  async onLogout() {
    this.authService.logout();
    await this.router.navigate([WebUrl.signin]);
  }

  async onLogin() {
    await this.router.navigate([WebUrl.signin]);
  }
}
