import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInDto, UserEntity } from '@city-workspace/shared-models';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SigninService } from './signin.service';
import { WebUrl } from '../../lib/constants/url.constants';
import { AuthService } from '../../lib/services/auth.service';
import { AlertService } from '../../lib/services/alert.service';

@Component({
  selector: 'app-signin',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    RouterLink,
  ],
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {
  webUrl = WebUrl;
  user: UserEntity | null = null;
  loading = signal(false);
  signinForm!: FormGroup;
  private signinService = inject(SigninService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSignIn() {
    this.user = null;
    this.alertService.clearMessages();
    const dto: SignInDto = this.signinForm.value;
    if (this.signinForm.valid) {
      this.loading.set(true);
      this.signinService.signin(dto)?.subscribe({
        next: (user: UserEntity) => {
          this.loading.set(false);
          this.user = user;
          this.signinForm.reset();
          if (this.user.tokens && this.user.tokens?.length > 0) {
            this.authService.login(this.user.tokens[0].token);
            this.router.navigate([WebUrl.createTenant]).then(() => {
              this.alertService.showSuccess('You have successfully signed in');
            });
          }
        },
        error: (error) => {
          this.loading.set(false);
          const errorMessage = error.error.message?.message || error;
          this.alertService.showError(JSON.stringify(errorMessage));
        },
      });
    }
  }
}
