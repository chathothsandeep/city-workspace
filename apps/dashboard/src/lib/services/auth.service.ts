// auth.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppConstants } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loginStatus = signal(false);
  private cookieService = inject(CookieService);

  login(token: string): void {
    this.cookieService.set(AppConstants.accessToken, token, {
      path: '/',
      secure: true,
      sameSite: 'Strict',
    });
    this.loginStatus.set(true);
  }

  logout(): void {
    this.cookieService.delete(AppConstants.accessToken, '/', undefined);
    this.loginStatus.set(false);
  }

  checkLoginStatus(): void {
    const accessToken = this.cookieService.get(AppConstants.accessToken);
    if (accessToken) {
      this.loginStatus.set(true);
    } else {
      this.loginStatus.set(false);
    }
  }

  getToken(): string | null {
    return this.cookieService.get(AppConstants.accessToken) || null;
  }

  getUserId(): number | undefined {
    const token = this.getToken();

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    }
    return undefined;
  }
}
