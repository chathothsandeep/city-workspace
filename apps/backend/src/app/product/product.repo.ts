import { Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  ProductEntity,
  UpdateProductDto,
} from '@city-workspace/shared-models';
import { db } from '../../lib/db';
import { FileUploadHelper } from '../../lib/helpers/fileUpload.helper';
import { AppConstants } from '../../lib/const/appConstants';

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

  async findAll(params: {
    [key: string]: any;
  }): Promise<{ data: ProductEntity[]; count: number }> {
    const tenantId = parseInt(params.tenantId, 10);
    const page = Number(params.page) || 1;
    const serachQuery = params.searchQuery || '';
    const skip = (page - 1) * AppConstants.paginationLimit;
    const results = await db.product.findMany({
      where: {
        tenantId: tenantId,
        name: {
          contains: serachQuery,
          mode: 'insensitive',
        },
      },
      take: AppConstants.paginationLimit,
      skip: skip,
    });

    const count = await db.product.count({
      where: {
        tenantId: tenantId,
        name: {
          contains: serachQuery,
          mode: 'insensitive',
        },
      },
    });

    return { data: results, count: count };
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
