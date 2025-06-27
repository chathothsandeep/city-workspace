import {
  CreateTenantDto,
  TenantEntity,
  UpdateTenantDto,
} from '@city-workspace/shared-models';
import { CrudService } from '../../lib/crud';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { selectedTenantFields } from '../../lib/selectedFileds/tenantFields';
import { LogHelper } from '../../lib/helpers/log.helper';
import { db } from '../../lib/db';

@Injectable()
export class TenantRepo implements CrudService<TenantEntity> {
  async create(
    data: CreateTenantDto,
    file?: any,
  ): Promise<TenantEntity | null> {
    let logoUrl: string | undefined = undefined;
    if (file) logoUrl = await this.uploadCompanyLogo(file);
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

  async uploadCompanyLogo(file: any): Promise<string> {
    if (!file) throw new Error('File is required');
    const uploadsDir = path.resolve(
      process.cwd(),
      'apps',
      'backend',
      'uploads',
      'tenant-logos',
    );
    const fileExtension = path.extname(file.originalname);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(uploadsDir, uniqueFilename);
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
      await fs.writeFile(filePath, file.buffer);
      return `/uploads/tenant-logos/${uniqueFilename}`;
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
