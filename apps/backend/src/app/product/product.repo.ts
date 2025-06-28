import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  ProductEntity,
  UpdateProductDto,
} from '@city-workspace/shared-models';
import { db } from '../../lib/db';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { LogHelper } from '../../lib/helpers/log.helper';

@Injectable()
export class ProductRepo {
  async create(
    data: CreateProductDto,
    file?: any,
    userId?: number,
  ): Promise<ProductEntity> {
    let image: string | undefined = undefined;
    if (file) image = await this.uploadProductImage(file);
    LogHelper.getInstance().log(image, 'repo');

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

  async uploadProductImage(file: any): Promise<string> {
    if (!file) throw new Error('File is required');
    const uploadsDir = path.resolve(
      process.cwd(),
      'apps',
      'backend',
      'uploads',
      'product-images',
    );
    const fileExtension = path.extname(file.originalname);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(uploadsDir, uniqueFilename);
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
      await fs.writeFile(filePath, file.buffer);
      return `/uploads/product-images/${uniqueFilename}`;
    } catch (error) {
      LogHelper.getInstance().error(
        `Failed to save uploaded file: ${error.message}`,
        'TenantRepo',
      );
      throw new HttpException(
        'Error processing company logo upload.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
