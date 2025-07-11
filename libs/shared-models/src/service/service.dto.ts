import { PartialType } from '@city-workspace/nest-mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  description!: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  image?: string | null;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsOptional()
  priceSymbol?: string | null;

  @IsNumber()
  @IsOptional()
  tenantId?: number | null;

  constructor(data?: Partial<CreateServiceDto>) {
    Object.assign(this, data);
  }
}

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  constructor(data?: Partial<UpdateServiceDto>) {
    super(data);
  }
}
