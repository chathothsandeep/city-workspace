import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CreateProductDto,
  PaginatedData,
  ProductEntity,
  UpdateProductDto,
} from '@city-workspace/shared-models';
import { Observable } from 'rxjs';
import { ApiUrl } from '../../lib/constants/url.constants';
import { CookieService } from 'ngx-cookie-service';
import { AppConstants } from '../../lib/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private cookie = inject(CookieService);

  createProduct(
    data: CreateProductDto,
    file?: File,
  ): Observable<ProductEntity> | null {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (file) formData.append('file', file);
    return this.http.post<ProductEntity>(ApiUrl.product, formData);
  }

  getProductInfo(id: number): Observable<ProductEntity> {
    return this.http.get<ProductEntity>(`${ApiUrl.product}/${id}`);
  }

  getProducts(
    page: number,
    searchQuery?: string,
  ): Observable<PaginatedData<ProductEntity[]>> {
    const tenantId = this.cookie.get(AppConstants.tenantId);
    const result = this.http.get<PaginatedData<ProductEntity[]>>(
      ApiUrl.product,
      {
        params: {
          tenantId: tenantId,
          page: page,
          searchQuery: searchQuery ?? '',
        },
      },
    );
    return result;
  }

  updateProduct(
    id: number,
    data: UpdateProductDto,
    file?: File,
  ): Observable<ProductEntity> | null {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (file) formData.append('file', file);
    return this.http.put<ProductEntity>(`${ApiUrl.product}/${id}`, formData);
  }

  deleteProduct(id: number): Observable<ProductEntity> {
    const url = `${ApiUrl.product}/${id}`;
    return this.http.delete<ProductEntity>(url);
  }
}
