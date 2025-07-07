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
import { CreateProductDto } from '@city-workspace/shared-models';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TextareaModule } from 'primeng/textarea';
import { Chip } from 'primeng/chip';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create.product',
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
  templateUrl: './addProduct.component.html',
  styles: ``,
})
export class CreateProduct implements OnInit {
  formData!: FormGroup;
  private alertService = inject(AlertService);
  private service = inject(ProductService);
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
      barcode: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      image: new FormControl(''),
      price: new FormControl(0, [Validators.required]),
      priceSymbol: new FormControl(''),
      quantity: new FormControl('0', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.alertService.clearMessages();
    const dto: CreateProductDto = this.formData.value;
    dto.tags = this.tags();
    if (this.formData.valid) {
      this.loading = true;
      this.service.createProduct(dto, this.file)?.subscribe({
        next: async (product) => {
          this.loading = false;
          this.formData.reset();
          this.tags.set([]);
          this.file = undefined;
          this.alertService.showSuccess('Product created successfully');
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
