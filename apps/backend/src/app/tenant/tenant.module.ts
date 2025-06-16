import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TenantRepo } from './tenant.repo';

@Module({
  controllers: [TenantController],
  providers: [TenantService, TenantRepo],
})
export class TenantModule {}
