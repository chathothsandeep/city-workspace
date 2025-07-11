import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../lib/services/alert.service';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TextareaModule } from 'primeng/textarea';
import { Chip } from 'primeng/chip';
import { WebUrl } from '../../../lib/constants/url.constants';
import { CardSkeleton } from '../../components/card-skeleton';
import { AppDialog } from '../../components/dialog';
import { ServiceService } from '../service.service';
import { ServiceEntity, UpdateServiceDto } from '@city-workspace/shared-models';

@Component({
  selector: 'app-create.service',
  imports: [
    CommonModule,
    NgOptimizedImage,
    ButtonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    TextareaModule,
    Chip,
    CardSkeleton,
    AppDialog,
  ],
  templateUrl: './serviceInfo.component.html',
  styles: ``,
})
export class ServiceInfo implements OnInit {
  formData!: FormGroup;
  private alertService = inject(AlertService);
  private serviceClass = inject(ServiceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  file: File | undefined = undefined;
  loading = false;
  buttonLoading = false;
  tags = signal<string[]>([]);
  isEdit = signal(false);
  service = signal<ServiceEntity>({} as ServiceEntity);
  url = URL;
  webUrl = WebUrl;
  isDeleteDialogVisible = signal(false);
  isDeleteLoading = signal(false);

  ngOnInit(): void {
    this.initialiseFormData();
    this.getServiceInfo();
  }

  getServiceInfo() {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.serviceClass.getServiceInfo(Number(id)).subscribe({
      next: (fetchedService) => {
        this.service.set(fetchedService);
        this.formData.patchValue(fetchedService);
        this.tags.set(fetchedService.tags ?? []);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        const errorMessage = error.error.message?.message || error;
        this.alertService.showError(JSON.stringify(errorMessage));
      },
    });
  }

  initialiseFormData() {
    this.formData = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
      ]),
      tags: new FormControl([]),
      image: new FormControl(''),
      price: new FormControl(0, [Validators.required]),
      priceSymbol: new FormControl(''),
    });
    this.formData.disable({ onlySelf: true, emitEvent: false });
  }

  onSubmit() {
    this.alertService.clearMessages();
    const dto: UpdateServiceDto = this.formData.value;
    dto.tags = this.tags();
    const isValid = this.formData.valid;
    if (isValid) {
      this.buttonLoading = true;
      this.serviceClass
        .updateService(this.service().id, dto, this.file)
        ?.subscribe({
          next: async (service) => {
            this.buttonLoading = false;
            this.service.set(service);
            this.formData.patchValue(service);
            this.tags.set(service.tags ?? []);
            this.file = undefined;
            this.alertService.showSuccess('Service updated successfully');
            this.toogleEdit();
          },
          error: (error) => {
            this.buttonLoading = false;
            const errorMessage = error.error.message?.message || error;
            this.alertService.showError(JSON.stringify(errorMessage));
          },
        });
    }
  }

  onCancel() {
    this.isEdit.set(false);
    this.toogleFormData();
  }

  onTagInputKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLInputElement;
      const value = inputElement.value.trim();
      if (value) {
        const tagArray = value
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0);
        this.tags.set(tagArray);
        inputElement.value = '';
      }
    }
  }

  removeTag(tag: string) {
    this.tags.update((tags) => tags.filter((t) => t !== tag));
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.file = input?.files?.[0];
    input.value = '';
  }

  toogleEdit() {
    this.isEdit.set(!this.isEdit());
    this.toogleFormData();
  }

  toogleFormData() {
    if (this.isEdit()) {
      this.formData?.enable({ onlySelf: true, emitEvent: false });
    } else {
      this.formData?.disable({ onlySelf: true, emitEvent: false });
    }
  }

  onDelete() {
    this.isDeleteLoading.set(true);
    this.serviceClass.deleteService(this.service().id).subscribe({
      next: () => {
        this.isDeleteLoading.set(false);
        this.isDeleteDialogVisible.set(false);
        this.router.navigate([WebUrl.service]).then(() => {
          this.alertService.showSuccess('Service deleted successfully');
        });
      },
      error: (error) => {
        this.isDeleteLoading.set(false);
        this.isDeleteDialogVisible.set(false);
        const errorMessage = error.error.message?.message || error;
        this.alertService.showError(JSON.stringify(errorMessage));
      },
    });
  }

  showDeleteDialog() {
    this.isDeleteDialogVisible?.set(true);
  }

  hideDeleteDialog() {
    this.isDeleteDialogVisible?.set(false);
  }
}
