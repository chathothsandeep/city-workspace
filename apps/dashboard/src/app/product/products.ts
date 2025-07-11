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
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import {
  ActivateEvent,
  ColumnMode,
  NgxDatatableModule,
  SelectEvent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { InputTextModule } from 'primeng/inputtext';

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
    NgxDatatableModule,
    PaginatorModule,
    InputTextModule,
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
  isDeleteDialogVisible = signal(false);
  isMultipleDeleteDialogVisible = signal(false);
  isDeleteLoading = signal(false);
  private alertService = inject(AlertService);
  object = Object;
  productToDelete: ProductEntity | null = null;
  ColumnMode = ColumnMode;
  reorderable = true;
  selectedProducts: ProductEntity[] = [];
  SelectionType = SelectionType;
  first = 0;
  rows = 10;
  count = 0;
  currentPage = 1;
  searchQuery = '';

  ngOnInit(): void {
    this.getProducts();
  }

  onSelect({ selected }: SelectEvent<ProductEntity>) {
    this.selectedProducts.splice(0, this.selectedProducts.length);
    this.selectedProducts.push(...selected);
  }

  onActivate(event: ActivateEvent<ProductEntity>) {
    console.log('Activate Event', event);
  }

  getProducts() {
    this.loading = true;
    this.service.getProducts(this.currentPage, this.searchQuery).subscribe({
      next: (paginatedData) => {
        this.products.set(paginatedData.data);
        this.count = paginatedData.count;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }

  async gotoCreateProduct() {
    await this.router.navigate([WebUrl.createProduct]);
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
    this.isDeleteLoading.set(false);
  }

  hideMultipleDeleteDialog() {
    this.selectedOptions = {};
    this.isMultipleDeleteDialogVisible?.set(false);
    this.isDeleteLoading.set(false);
  }

  onDelete() {
    this.isDeleteLoading.set(true);
    this.service.deleteProduct(this.productToDelete!.id!).subscribe({
      next: () => {
        this.getProducts();
        this.hideDeleteDialog();
        this.alertService.showSuccess('Product deleted successfully');
      },
      error: (error) => {
        const errorMessage = error.error.message?.message || error;
        this.hideDeleteDialog();
        this.alertService.showError(JSON.stringify(errorMessage));
      },
    });
  }

  onDeleteMultiple() {
    if (this.selectedProducts.length === 0) {
      this.alertService.showError('No products selected for deletion.');
      return;
    }

    this.isDeleteLoading.set(true);
    this.selectedProducts.forEach((product) => {
      this.service.deleteProduct(product.id).subscribe({
        next: async (data) => {
          await this.getProducts();
          this.hideMultipleDeleteDialog();
          this.alertService.showSuccess('Products deleted successfully');
        },
        error: (error) => {
          this.hideMultipleDeleteDialog();
          const errorMessage = error.error.message?.message || error;
          this.alertService.showError(JSON.stringify(errorMessage));
        },
      });
    });
  }

  onPageChange(event: PaginatorState) {
    this.currentPage = Math.floor(event.first! / event.rows!) + 1;
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.getProducts();
  }

  resetSearch() {
    this.searchQuery = '';
    this.getProducts();
  }
}
