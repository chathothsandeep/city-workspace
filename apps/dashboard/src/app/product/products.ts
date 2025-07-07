import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductEntity } from '@city-workspace/shared-models';
import { ProductService } from './product.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { WebUrl } from '../../lib/constants/url.constants';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { TableSkelton } from '../components/table-skeleton';
import { AppDialog } from '../components/dialog';
import { AlertService } from '../../lib/services/alert.service';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    NgOptimizedImage,
    Select,
    FormsModule,
    TableSkelton,
    AppDialog,
    Checkbox,
  ],
  templateUrl: './products.html',
  styles: ``,
})
export class Products implements OnInit {
  products = signal<ProductEntity[]>([]);
  loading = false;
  private service = inject(ProductService);
  private router = inject(Router);
  webUrl = WebUrl;
  options = ['See Details', 'Delete'];
  selectedOptions: { [key: number]: string } = {};
  selectedProducts: { [key: number]: boolean } = {};
  isDeleteDialogVisible = signal(false);
  isMultipleDeleteDialogVisible = signal(false);
  isDeleteLoading = signal(false);
  private alertService = inject(AlertService);
  object = Object;
  productToDelete: ProductEntity | null = null;

  ngOnInit(): void {
    this.getProducts();
    this.products().forEach((product) => {
      this.selectedProducts[product.id] = false;
    });
  }

  getProducts() {
    this.loading = true;
    this.service.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }

  async gotoCreateProduct() {
    try {
      await this.router.navigate([WebUrl.createProduct]);
    } catch (error) {
      console.log('route error:', JSON.stringify(error));
    }
  }

  async onSelectChange(event: any, product: ProductEntity) {
    this.productToDelete = product;
    this.selectedOptions[product.id] = event.value;
    if (this.selectedOptions[product.id] === 'See Details') {
      await this.router.navigate([`${WebUrl.editProduct}/${product.id}`]);
    } else {
      this.showDeleteDialog();
    }
  }

  showDeleteDialog() {
    this.isDeleteDialogVisible?.set(true);
  }

  showMultipleDeleteDialog() {
    this.isMultipleDeleteDialogVisible?.set(true);
  }

  hideDeleteDialog() {
    this.selectedOptions = {};
    this.isDeleteDialogVisible?.set(false);
  }

  hideMultipleDeleteDialog() {
    this.selectedOptions = {};
    this.isMultipleDeleteDialogVisible?.set(false);
    this.products().forEach((product) => {
      this.selectedProducts[product.id] = false;
    });
  }

  onDelete() {
    this.isDeleteLoading.set(true);
    this.service.deleteProduct(this.productToDelete!.id!).subscribe({
      next: () => {
        window.location.reload();
        this.alertService.showSuccess('Product deleted successfully');
        this.isDeleteDialogVisible.set(false);
        this.isDeleteLoading.set(false);
      },
      error: (error) => {
        const errorMessage = error.error.message?.message || error;
        this.alertService.showError(JSON.stringify(errorMessage));
        this.isDeleteDialogVisible.set(false);
        this.isDeleteLoading.set(false);
      },
    });
  }

  selectAllProducts(event: any) {
    if (event.checked) {
      this.products().forEach((product) => {
        this.selectedProducts[product.id] = true;
      });
    } else {
      this.products().forEach((product) => {
        this.selectedProducts[product.id] = false;
      });
    }
  }

  onDeleteMultiple() {
    const productsToDelete = this.products().filter((product) => {
      return this.selectedProducts[product.id];
    });

    if (productsToDelete.length === 0) {
      this.alertService.showError('No products selected for deletion.');
      return;
    }

    this.isDeleteLoading.set(true);
    productsToDelete.forEach((product) => {
      this.service.deleteProduct(product.id).subscribe({
        next: (data) => {
          this.isDeleteLoading.set(false);
          window.location.reload();
          this.hideMultipleDeleteDialog();
          this.alertService.showSuccess('Products deleted successfully');
        },
        error: (error) => {
          this.isDeleteLoading.set(false);
          this.hideMultipleDeleteDialog();
          const errorMessage = error.error.message?.message || error;
          this.alertService.showError(JSON.stringify(errorMessage));
        },
      });
    });
  }
}
