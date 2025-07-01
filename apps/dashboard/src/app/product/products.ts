import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductEntity } from '@city-workspace/shared-models';
import { ProductService } from './product.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { WebUrl } from '../../lib/constants/url.constants';
import { FormsModule } from '@angular/forms';
import { DataView } from 'primeng/dataview';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    NgOptimizedImage,
    Select,
    FormsModule,
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
  selectedOption: string | undefined;

  ngOnInit(): void {
    this.getProducts();
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
    await this.router.navigate([WebUrl.createProduct]);
  }
}
