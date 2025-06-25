export class ProductEntity {
  id!: number;
  name!: string;
  description!: string;
  tags?: string[];
  barcode!: string;
  image?: string;
  price!: number;
  priceSymbol?: string;
  quantity!: number;
  unit!: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Partial<ProductEntity>) {
    Object.assign(this, data);
  }
}
