import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  fullName!: string;

  @IsString()
  mobile!: string;

  @IsString()
  addressOne!: string;

  @IsString()
  adrressTwo?: string;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsNumber()
  @IsOptional()
  zip?: number;

  @IsString()
  @IsOptional()
  landmark?: string;

  @IsString()
  country!: string;

  @IsString()
  state!: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsNumber()
  @IsOptional()
  userId?: number;

  constructor(data?: Partial<CreateAddressDto>) {
    Object.assign(this, data);
  }
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  constructor(data?: Partial<UpdateAddressDto>) {
    super(data);
  }
}
