import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { ServiceRepo } from './service.repo';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepo],
})
export class ServicetModule {}
