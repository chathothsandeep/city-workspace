import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../lib/services/alert.service';
import { ProductEntity, UpdateProductDto } from '@city-workspace/shared-models';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TextareaModule } from 'primeng/textarea';
import { Chip } from 'primeng/chip';
import { ProductService } from '../product.service';
import { WebUrl } from '../../../lib/constants/url.constants';
import { CardSkeleton } from '../../components/card-skeleton';

@Component({
  selector: 'app-create.product',
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
  ],
  templateUrl: './productInfo.component.html',
  styles: ``,
})
export class ProductInfo implements OnInit {
  id?: string;
  formData!: FormGroup;
  private alertService = inject(AlertService);
  private service = inject(ProductService);
  private route = inject(ActivatedRoute);
  file: File | undefined = undefined;
  loading = false;
  buttonLoading = false;
  tags = signal<string[]>([]);
  isEdit = signal(false);
  product = signal<ProductEntity>({} as ProductEntity);
  url = URL;
  webUrl = WebUrl;

  ngOnInit(): void {
    this.initialiseFormData();
    this.getProductInfo();
  }

  getProductInfo() {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getProductInfo(Number(id)).subscribe({
      next: (fetchedProduct) => {
        this.product.set(fetchedProduct);
        this.formData.patchValue(fetchedProduct);
        this.tags.set(fetchedProduct.tags ?? []);
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
    this.formData.disable({ onlySelf: true, emitEvent: false });
  }

  onSubmit() {
    this.alertService.clearMessages();
    const dto: UpdateProductDto = this.formData.value;
    dto.tags = this.tags();
    if (this.formData.valid) {
      this.buttonLoading = true;
      this.service.updateProduct(this.product().id, dto, this.file)?.subscribe({
        next: async (product) => {
          this.buttonLoading = false;
          this.product.set(product);
          this.formData.patchValue(product);
          this.tags.set(product.tags ?? []);
          this.file = undefined;
          this.alertService.showSuccess('Product updated successfully');
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
}
