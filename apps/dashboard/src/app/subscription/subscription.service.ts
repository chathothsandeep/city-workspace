import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  SubscriptionEntity,
  TenantEntity,
} from '@city-workspace/shared-models';
import { ApiUrl } from '../../lib/constants/url.constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private http: HttpClient = inject(HttpClient);

  selectSubscription(
    subscriptionId: number,
    tenantId: number,
  ): Observable<TenantEntity> {
    const url = `${ApiUrl.tenant}/${tenantId}`;
    return this.http.patch<TenantEntity>(url, {
      subscriptionId: subscriptionId,
    });
  }

  findAllSubscriptions(): Observable<SubscriptionEntity[]> {
    return this.http.get<SubscriptionEntity[]>(ApiUrl.subscription);
  }
}
