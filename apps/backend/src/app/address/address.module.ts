import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressRepo } from './address.repo';

@Module({
  controllers: [AddressController],
  providers: [AddressService, AddressRepo],
})
export class AddressModule {}
