import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';
import { PartialType } from '@city-workspace/nest-mapped-types';
export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @IsArray()
  @IsString({ each: true })
  features!: string[];

  @IsBoolean()
  @IsNotEmpty()
  isPopular!: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Cost must be a non-negative number' })
  cost!: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 10, {
    message: 'Price symbol must be between 1 and 10 characters',
  })
  priceSymbol!: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['month', 'year'], {
    message: 'Cost duration must be either "month" or "year"',
  })
  costDuration!: string;

  @IsNumber()
  @IsOptional()
  subscriptionId!: number;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  constructor(data?: Partial<CreateSubscriptionDto>) {
    Object.assign(this, data);
  }
}

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  constructor(data?: Partial<UpdateSubscriptionDto>) {
    super(data);
  }
}
