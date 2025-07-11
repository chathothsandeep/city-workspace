import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CreateServiceDto,
  PaginatedData,
  ServiceEntity,
  UpdateServiceDto,
} from '@city-workspace/shared-models';
import { Observable } from 'rxjs';
import { ApiUrl } from '../../lib/constants/url.constants';
import { CookieService } from 'ngx-cookie-service';
import { AppConstants } from '../../lib/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private http = inject(HttpClient);
  private cookie = inject(CookieService);

  createService(
    data: CreateServiceDto,
    file?: File,
  ): Observable<ServiceEntity> | null {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (file) formData.append('file', file);
    return this.http.post<ServiceEntity>(ApiUrl.service, formData);
  }

  getServiceInfo(id: number): Observable<ServiceEntity> {
    return this.http.get<ServiceEntity>(`${ApiUrl.service}/${id}`);
  }

  getServices(
    page: number,
    searchQuery?: string,
  ): Observable<PaginatedData<ServiceEntity[]>> {
    const tenantId = this.cookie.get(AppConstants.tenantId);
    const result = this.http.get<PaginatedData<ServiceEntity[]>>(
      ApiUrl.service,
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

  updateService(
    id: number,
    data: UpdateServiceDto,
    file?: File,
  ): Observable<ServiceEntity> | null {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (file) formData.append('file', file);
    return this.http.put<ServiceEntity>(`${ApiUrl.service}/${id}`, formData);
  }

  deleteService(id: number): Observable<ServiceEntity> {
    const url = `${ApiUrl.service}/${id}`;
    return this.http.delete<ServiceEntity>(url);
  }
}
