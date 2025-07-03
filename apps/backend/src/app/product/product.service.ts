import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  ProductEntity,
  UpdateProductDto,
} from '@city-workspace/shared-models';
import { HttpErrorHelper } from '../../lib/helpers/httpError.helper';
import { ProductRepo } from './product.repo';

@Injectable()
export class ProductService {
  constructor(private readonly repo: ProductRepo) {}
  async create(
    data: CreateProductDto,
    file: any,
    userId: number,
  ): Promise<ProductEntity | null> {
    try {
      const product = await this.repo.create(data, file, userId);
      if (!product) {
        throw new HttpException(
          'Product cannot be created',
          HttpStatus.BAD_REQUEST,
        );
      }
      return product;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
  async findAll(params: { [key: string]: any }): Promise<ProductEntity[]> {
    try {
      const products = await this.repo.findAll(params);
      if (!products || products.length === 0) {
        throw new HttpException('No products found', HttpStatus.NOT_FOUND);
      }
      return products;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
  async find(id: number): Promise<ProductEntity> {
    try {
      const product = await this.repo.find(id);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
  async update(id: number, data: UpdateProductDto, file: any): Promise<ProductEntity> {
    try {
      const product = await this.repo.update(id, data, file);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }

  async delete(id: number): Promise<ProductEntity> {
    try {
      const product = await this.repo.delete(id);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
}
