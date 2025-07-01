import { Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  ProductEntity,
  UpdateProductDto,
} from '@city-workspace/shared-models';
import { db } from '../../lib/db';
import { FileUploadHelper } from '../../lib/helpers/fileUpload.helper';

@Injectable()
export class ProductRepo {
  constructor(private readonly uploader: FileUploadHelper) {}
  async create(
    data: CreateProductDto,
    file?: any,
    userId?: number,
  ): Promise<ProductEntity> {
    let image: string | undefined = undefined;
    if (file) image = await this.uploader.uploadFile(file, 'product-images');

    return db.$transaction(async (tx) => {
      const tenant = await tx.tenant.findUnique({
        where: { userId: userId },
      });
      return tx.product.create({
        data: { ...data, image: image, tenantId: tenant.id },
      });
    });
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
