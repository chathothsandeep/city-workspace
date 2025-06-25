import { Injectable } from '@nestjs/common';
import { CrudService } from '../../lib/crud';
import {
  CreateProductDto,
  ProductEntity,
  UpdateProductDto,
} from '@city-workspace/shared-models';
import { db } from '../../lib/db';

@Injectable()
export class ProductRepo implements CrudService<ProductEntity> {
  create(data: CreateProductDto): Promise<ProductEntity> {
    return db.product.create({ data });
  }
  findAll(params: { [key: string]: any }): Promise<ProductEntity[]> {
    return db.product.findMany({
      where: { ...params },
    });
  }
  find(id: number): Promise<ProductEntity> {
    return db.product.findUnique({ where: { id } });
  }
  update(id: number, data: UpdateProductDto): Promise<ProductEntity> {
    return db.product.update({ where: { id }, data });
  }

  delete(id: number): Promise<ProductEntity> {
    return db.product.delete({ where: { id } });
  }
}
