/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupService } from './signup.service';
import { CreateUserDto, UserEntity } from '@city-workspace/shared-models';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserRoles } from '@city-workspace/common-utils';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Validators } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';

import { WebUrl } from '../../lib/constants/url.constants';
import { AlertService } from '../../lib/services/alert.service';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
  ],
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  user: UserEntity | null = null;
  signupService = inject(SignupService);
  signupForm!: FormGroup;
  loading = signal(false);
  private router = inject(Router);
  private alertService = inject(AlertService);

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      role: new FormControl(UserRoles.ADMIN),
    });
  }

  onSubmit() {
    this.user = null;
    this.alertService.clearMessages();
    const dto: CreateUserDto = this.signupForm.value;
    dto.role = UserRoles.ADMIN;
      const { confirmPassword: _, ...rest } = dto;
      if (this.signupForm.valid) { 
        this.loading.set(true);
        this.signupService.signup(rest)?.subscribe({
          next: async (user: UserEntity) => {
            this.loading.set(false);
            this.user = user;
            this.alertService.showSuccess('User created successfully!');
            await this.router.navigate([WebUrl.signin]);
          },
          error: (error) => {
            this.loading.set(false);
            this.alertService.showError(
              JSON.stringify(
                error.error.message.message
                  ? error.error.message.message
                  : error,
              ),
            );
          },
        });
      }
    
  }
}
