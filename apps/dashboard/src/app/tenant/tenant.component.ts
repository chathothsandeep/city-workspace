import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTenantDto, TenantEntity } from '@city-workspace/shared-models';
import { TenantService } from './tenant.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';
import { AlertService } from '../../lib/services/alert.service';
import { Dialog } from 'primeng/dialog';
import { WebUrl } from '../../lib/constants/url.constants';
import { CookieService } from 'ngx-cookie-service';
import { AppConstants } from '../../lib/constants/app.constants';
import { AuthService } from '../../lib/services/auth.service';

@Component({
  selector: 'app-tenant',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    Dialog,
  ],
  templateUrl: './tenant.component.html',
})
export class TenantComponent implements OnInit {
  tenant: TenantEntity | null = null;
  private tenantService = inject(TenantService);
  formData!: FormGroup;
  loading = signal(false);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private cookieService = inject(CookieService);
  private authService = inject(AuthService);

  visible = false;
  file: File | undefined = undefined;
  userId: number | undefined = undefined;

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      website: new FormControl(''),
      lat: new FormControl(0, [Validators.required]),
      long: new FormControl(0, [Validators.required]),
      logo: new FormControl(''),
      userId: new FormControl(this.userId),
    });
  }

  onCreateTenant() {
    this.tenant = null;
    this.alertService.clearMessages();
    const dto: CreateTenantDto = this.formData.value;
    if (this.formData.valid) {
      this.loading.set(true);
      this.tenantService.createTenant(dto, this.file)?.subscribe({
        next: async (tenant) => {
          this.loading.set(false);
          this.tenant = tenant;
          this.alertService.showSuccess('Tenant created successfully');
          this.cookieService.set(AppConstants.tenantId, tenant.id.toString());
          await this.router.navigate([WebUrl.subscription]);
        },
        error: (error) => {
          this.loading.set(false);
          const errorMessage = error.error.message?.message || error;
          this.alertService.showError(JSON.stringify(errorMessage));
        },
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.file = input?.files?.[0];
  }

  showDialog() {
    this.visible = true;
  }

  fetchLocation() {
    this.visible = false;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          this.formData.patchValue({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        } else {
          this.alertService.showError('Unable to fetch location');
        }
      },
      (error) => {
        this.alertService.showError(
          'Unable to fetch location. Please enable location services.',
        );
      },
    );
  }
}
