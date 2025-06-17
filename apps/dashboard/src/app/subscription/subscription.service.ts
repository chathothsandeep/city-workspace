import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  SubscriptionEntity,
  TenantEntity,
  UpdateTenantDto,
} from '@city-workspace/shared-models';
import { ApiUrl } from '../../lib/constants/url.constants';
import { AuthService } from '../../lib/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private http: HttpClient = inject(HttpClient);

  selectSubscription(
    dto: any,
    tenantId: number,
  ): Observable<TenantEntity> {
    const url = `${ApiUrl.tenant}/${tenantId}`;
    return this.http.patch<TenantEntity>(url, dto, {
      headers: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      },
    });
  }

  private auth = inject(AuthService);
  findAllSubscriptions(): Observable<SubscriptionEntity[]> {
    return this.http.get<SubscriptionEntity[]>(ApiUrl.subscription, {
      headers: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      },
    });
  }
}
