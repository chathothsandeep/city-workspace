// auth.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loginStatus = signal(false);
  private cookieService = inject(CookieService);

  login(token: string): void {
    this.cookieService.set('access_token', token, {
      path: '/',
      secure: true,
      sameSite: 'Strict',
    });
    this.loginStatus.set(true);
  }

  logout(): void {
    this.cookieService.delete('access_token', '/', undefined);
    this.loginStatus.set(false);
  }

  checkLoginStatus(): void {
    const accessToken = this.cookieService.get('access_token');
    if (accessToken) {
      this.loginStatus.set(true);
    } else {
      this.loginStatus.set(false);
    }
  }

  getToken(): string | null {
    return this.cookieService.get('access_token') || null;
  }
}
