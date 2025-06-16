import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(3)
  name!: string;

  @IsString()
  phone!: string;

  @IsString()
  department?: string;

  constructor(data?: Partial<CreateAdminDto>) {
    Object.assign(this, data);
  }
}

export class UpdateAdminDtio extends PartialType(CreateAdminDto) {
  constructor(data?: Partial<UpdateAdminDtio>) {
    super(data);
  }
}
