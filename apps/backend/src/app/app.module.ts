import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { throttleOptions } from '../lib/throttleOptions';
import { ThrottlerModule } from '@nestjs/throttler';
import {
  AppThrottleGuardProvider,
  GlobalAuthGuardProvider,
} from '../providers/appGuard.provider';
import { HttpLogMiddleware } from '../middlewares/http-log.midleware';
import { UserModule } from './users/user.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from '../global/global.module';
import { AddressModule } from './address/address.module';
import { TenantModule } from './tenant/tenant.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    GlobalModule,
    ThrottlerModule.forRoot(throttleOptions),
    UserModule,
    AdminModule,
    AuthModule,
    AddressModule,
    TenantModule,
    SubscriptionModule,
    ProductModule,
  ],
  controllers: [],
  providers: [Logger, AppThrottleGuardProvider, GlobalAuthGuardProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLogMiddleware).forRoutes('*');
  }
}
