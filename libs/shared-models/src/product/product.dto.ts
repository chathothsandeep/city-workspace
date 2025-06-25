import { PartialType } from '@city-workspace/nest-mapped-types';

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
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

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  barcode!: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsOptional()
  priceSymbol?: string;

  @IsNumber()
  @IsNotEmpty()
  quantity!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  unit!: string;

  constructor(data?: Partial<CreateProductDto>) {
    Object.assign(this, data);
  }
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  constructor(data?: Partial<UpdateProductDto>) {
    super(data);
  }
}
