import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpErrorHelper } from '../../lib/helpers/httpError.helper';
import { ServiceRepo } from './service.repo';
import {
  CreateServiceDto,
  ServiceEntity,
  UpdateServiceDto,
} from '@city-workspace/shared-models';

@Injectable()
export class ServiceService {
  constructor(private readonly repo: ServiceRepo) {}
  async create(
    data: CreateServiceDto,
    file: any,
    userId: number,
  ): Promise<ServiceEntity | null> {
    try {
      const service = await this.repo.create(data, file, userId);
      if (!service) {
        throw new HttpException(
          'Service cannot be created',
          HttpStatus.BAD_REQUEST,
        );
      }
      return service;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
  async findAll(params: {
    [key: string]: any;
  }): Promise<{ data: ServiceEntity[]; count: number }> {
    try {
      const results = await this.repo.findAll(params);
      if (!results.data || results.data.length === 0) {
        throw new HttpException('No service found', HttpStatus.NOT_FOUND);
      }
      return results;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
  async find(id: number): Promise<ServiceEntity> {
    try {
      const service = await this.repo.find(id);
      if (!service) {
        throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
      }
      return service;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
  async update(
    id: number,
    data: UpdateServiceDto,
    file: any,
  ): Promise<ServiceEntity> {
    try {
      const service = await this.repo.update(id, data, file);
      if (!service) {
        throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
      }
      return service;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }

  async delete(id: number): Promise<ServiceEntity> {
    try {
      const service = await this.repo.delete(id);
      if (!service) {
        throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
      }
      return service;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
}
