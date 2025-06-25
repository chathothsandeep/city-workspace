import { PartialType } from '@city-workspace/nest-mapped-types';
import { UserRoles } from '@city-workspace/common-utils';
import {
  IsEmail,
  IsString,
  IsEnum,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(3)
  name!: string;

  @IsEnum(UserRoles)
  role!: UserRoles;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  confirmPassword?: string;

  constructor(data?: Partial<CreateUserDto>) {
    Object.assign(this, data);
  }
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
