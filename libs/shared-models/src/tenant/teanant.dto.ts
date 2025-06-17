import { IsEmail, IsOptional, IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTenantDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  phone!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsNumber()
  lat!: number;

  @IsNumber()
  long!: number;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsNumber()
  subscriptionId?: number;

  @IsOptional()
  @IsNumber()
  userId?: number;

  constructor(data?: Partial<CreateTenantDto>) {
    Object.assign(this, data);
  }
}

export class UpdateTenantDto extends PartialType(CreateTenantDto) {
  constructor(data?: Partial<UpdateTenantDto>) {
    super(data);
  }
}
