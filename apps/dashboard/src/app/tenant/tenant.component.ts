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
  visible = false;
  file: File | undefined = undefined;

  ngOnInit(): void {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      website: new FormControl(''),
      lat: new FormControl(0, [Validators.required]),
      long: new FormControl(0, [Validators.required]),
      logo: new FormControl(''),
    });
  }

  onCreateTenant() {
    console.log('Creating tenant...', this.formData.value);
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
          await this.router.navigate([WebUrl.subscription]);
        },
        error: (error) => {
          this.loading.set(false);
          this.alertService.showError(
            JSON.stringify(
              error.error.message.message ? error.error.message.message : error,
            ),
          );
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
    this.formData.patchValue({
      lat: 11.6345873,
      long: 104.999927,
    });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.formData.patchValue({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (error) => {
        this.alertService.showError(
          'Unable to fetch location. Please enable location services.',
        );
      },
    );
  }
}
