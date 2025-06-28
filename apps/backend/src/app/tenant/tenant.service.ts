import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTenantDto, TenantEntity } from '@city-workspace/shared-models';
import { TenantRepo } from './tenant.repo';
import { HttpErrorHelper } from '../../lib/helpers/httpError.helper';

@Injectable()
export class TenantService  {
  constructor(private readonly repo: TenantRepo) {}
  async create(
    data: CreateTenantDto,
    file?: any,
  ): Promise<TenantEntity | null> {
    try {
      const tenant = await this.repo.create(data, file);
      if (!tenant) {
        throw new HttpException(
          'Tenant cannot be created',
          HttpStatus.BAD_REQUEST,
        );
      }

      return tenant;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
    
  async findAll(params: { [key: string]: any }): Promise<TenantEntity[]> {
    try {
      const tenants = await this.repo.findAll(params);
      if (!tenants || tenants.length === 0) {
        throw new HttpException('No tenants Found', HttpStatus.NOT_FOUND);
      }
      return tenants;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
  async find(id: number): Promise<TenantEntity | null> {
    try {
      const tenant = await this.repo.find(id);
      if (!tenant) {
        throw new HttpException('Tenant Not Found', HttpStatus.NOT_FOUND);
      }
      return tenant;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
  async update(id: number, data: any): Promise<TenantEntity | null> {
    try {
      const tenant = await this.repo.update(id, data);
      if (!tenant) {
        throw new HttpException('Tenant Not Found', HttpStatus.NOT_FOUND);
      }
      return tenant;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }

  async updateFew(id: number, data: any): Promise<TenantEntity | null> {
    try {
      const tenant = await this.repo.updateFew(id, data);
      if (!tenant) {
        throw new HttpException('Tenant Not Found', HttpStatus.NOT_FOUND);
      }
      return tenant;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
  async delete(id: number): Promise<TenantEntity | null> {
    try {
      const tenant = await this.repo.delete(id);
      if (!tenant) {
        throw new HttpException('Tenant Not Found', HttpStatus.NOT_FOUND);
      }
      return tenant;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }

  async uploadCompanyLogo(file: File): Promise<string> {
    try {
      const logoUrl = await this.repo.uploadCompanyLogo(file);
      if (!logoUrl) {
        throw new HttpException('Logo upload failed', HttpStatus.BAD_REQUEST);
      }
      return logoUrl;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
}
