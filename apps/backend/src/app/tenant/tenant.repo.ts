import {
  CreateTenantDto,
  TenantEntity,
  UpdateTenantDto,
} from '@city-workspace/shared-models';

import { Injectable } from '@nestjs/common';

import { selectedTenantFields } from '../../lib/selectedFileds/tenantFields';
import { LogHelper } from '../../lib/helpers/log.helper';
import { db } from '../../lib/db';
import { FileUploadHelper } from '../../lib/helpers/fileUpload.helper';

@Injectable()
export class TenantRepo {
  constructor(private readonly uploader: FileUploadHelper) {}
  async create(
    data: CreateTenantDto,
    file?: any,
  ): Promise<TenantEntity | null> {
    let logoUrl: string | undefined = undefined;
    if (file) logoUrl = await this.uploader.uploadFile(file, 'tenant-logos');
    return await db.tenant.create({
      data: { ...data, logo: logoUrl },
      select: selectedTenantFields,
    });
  }

  async findAll(params: { [key: string]: any }): Promise<TenantEntity[]> {
    const tenants = await db.tenant.findMany();
    return tenants;
  }
  async find(id: number): Promise<TenantEntity | null> {
    return await db.tenant.findUnique({
      where: {
        id: id,
      },
      select: selectedTenantFields,
    });
  }
  async update(
    id: number,
    data: UpdateTenantDto,
  ): Promise<TenantEntity | null> {
    return await db.tenant.update({
      where: {
        id: id,
      },
      data: data,
      select: selectedTenantFields,
    });
  }

  async updateFew(id: number, data: any): Promise<TenantEntity | null> {
    LogHelper.getInstance().log(data, 'repo');
    return await db.tenant.update({
      where: {
        id: id,
      },
      data: {
        subscriptionId: data.subscriptionId,
      },
      select: selectedTenantFields,
    });
  }
  async delete(id: number): Promise<TenantEntity | null> {
    return await db.tenant.delete({
      where: {
        id: id,
      },
      select: selectedTenantFields,
    });
  }
}
