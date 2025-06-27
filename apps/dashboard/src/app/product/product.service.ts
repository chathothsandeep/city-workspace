import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateProductDto, ProductEntity } from '@city-workspace/shared-models';
import { Observable } from 'rxjs';
import { ApiUrl } from '../../lib/constants/url.constants';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
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

  getProducts(): Observable<ProductEntity[]> {
    return this.http.get<ProductEntity[]>(ApiUrl.product);
  }
}
