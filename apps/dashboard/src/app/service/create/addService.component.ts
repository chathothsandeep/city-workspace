import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertService } from '../../../lib/services/alert.service';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TextareaModule } from 'primeng/textarea';
import { Chip } from 'primeng/chip';
import { ServiceService } from '../service.service';
import { CreateServiceDto } from '@city-workspace/shared-models';

@Component({
  selector: 'app-create.service',
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    TextareaModule,
    Chip,
  ],
  templateUrl: './addService.component.html',
  styles: ``,
})
export class CreateService implements OnInit {
  formData!: FormGroup;
  private alertService = inject(AlertService);
  private service = inject(ServiceService);
  file: File | undefined = undefined;
  loading = false;
  tags = signal<string[]>([]);
  url = URL;

  ngOnInit(): void {
    this.initialiseFormData();
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
  }

  onSubmit() {
    this.alertService.clearMessages();
    const dto: CreateServiceDto = this.formData.value;
    dto.tags = this.tags();
    if (this.formData.valid) {
      this.loading = true;
      this.service.createService(dto, this.file)?.subscribe({
        next: async (service) => {
          this.loading = false;
          this.formData.reset();
          this.tags.set([]);
          this.file = undefined;
          this.alertService.showSuccess('Service created successfully');
        },
        error: (error) => {
          this.loading = false;
          const errorMessage = error.error.message?.message || error;
          this.alertService.showError(JSON.stringify(errorMessage));
        },
      });
    }
  }

  onCancel() {
    this.formData.reset();
    this.tags.set([]);
    this.file = undefined;
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
  }
}
