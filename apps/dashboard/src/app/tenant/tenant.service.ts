import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateTenantDto, TenantEntity } from '@city-workspace/shared-models';
import { Observable } from 'rxjs';
import { ApiUrl } from '../../lib/constants/url.constants';
import { AuthService } from '../../lib/services/auth.service';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private http = inject(HttpClient);
  createTenant(
    data: CreateTenantDto,
    file?: File,
  ): Observable<TenantEntity> | null {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (file) formData.append('file', file);
    return this.http.post<TenantEntity>(ApiUrl.tenant, formData);
  }
}
