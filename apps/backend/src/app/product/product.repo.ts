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
    const tenantId = parseInt(params.tenantId, 10);
    return db.product.findMany({
      where: {
        tenantId: tenantId,
      },
    });
  }
  find(id: number): Promise<ProductEntity> {
    return db.product.findUnique({ where: { id } });
  }
  async update(
    id: number,
    data: UpdateProductDto,
    file: any,
  ): Promise<ProductEntity> {
    let image: string | undefined = undefined;
    if (file) image = await this.uploader.uploadFile(file, 'product-images');
    return db.product.update({
      where: { id },
      data: {
        ...data,
        image: image,
      },
    });
  }

  delete(id: number): Promise<ProductEntity> {
    return db.product.delete({ where: { id } });
  }
}
