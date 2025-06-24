import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {
  SubscriptionEntity,
  UpdateSubscriptionDto,
} from '@city-workspace/shared-models';
import { SubscriptionService } from './subscription.service';
import { AlertService } from '../../lib/services/alert.service';
import { SpinnerComponent } from '../components/spinner.component';
import { CookieService } from 'ngx-cookie-service';
import { AppConstants } from '../../lib/constants/app.constants';
import { Router } from '@angular/router';
import { WebUrl } from '../../lib/constants/url.constants';

@Component({
  selector: 'app-subscription',
  imports: [CommonModule, ButtonModule, CardModule, SpinnerComponent],
  templateUrl: './subscription.component.html',
  standalone: true,
})
export class SubscriptionComponent implements OnInit {
  loading = true;
  buttonloading = false;
  subscriptions: SubscriptionEntity[] | null = null;
  private service: SubscriptionService = inject(SubscriptionService);
  private alertService = inject(AlertService);
  private cookieService = inject(CookieService);
  private router = inject(Router);
  

  ngOnInit(): void {
    this.onLoadSubscriptions();
  }

  async onLoadSubscriptions() {
    this.alertService.clearMessages();
    await this.service.findAllSubscriptions().subscribe({
      next: (subscriptions) => {
        this.loading = false;
        this.subscriptions = subscriptions;
      },
      error: (error) => {
        this.loading = false;
        console.log('error', JSON.stringify(error));
        this.alertService.showError(
          JSON.stringify(
            error.error.message.message ? error.error.message.message : error,
          ),
        );
      },
    });
  }

  async onSelecteSubscription(subscription: SubscriptionEntity) {
    this.buttonloading = true;
    const tenantId = this.cookieService.get(AppConstants.tenantId);
    const updateTenantDto: UpdateSubscriptionDto = new UpdateSubscriptionDto({
      subscriptionId: subscription.id,
    });
    this.service
      .selectSubscription(updateTenantDto, Number(tenantId))
      .subscribe({
        next: async (tenant) => {
          this.buttonloading = false;
          if (tenant) {
            await this.router.navigate([WebUrl.home]);
            this.alertService.showSuccess(
              'Congrats! Your Subscription is active',
            );
          }
        },
        error: (error) => {
          this.buttonloading = false;
          console.log('error', JSON.stringify(error));
          const errorMessage = error.error.message?.message || error;
          this.alertService.showError(JSON.stringify(errorMessage));
        },
      });
  }
}
