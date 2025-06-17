import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionRepo } from './subscription.repo';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionRepo],
})
export class SubscriptionModule {}
