import { Injectable } from '@nestjs/common';
import { db } from '../../lib/db';
import { FileUploadHelper } from '../../lib/helpers/fileUpload.helper';
import { AppConstants } from '../../lib/const/appConstants';
import {
  CreateServiceDto,
  ServiceEntity,
  UpdateServiceDto,
} from '@city-workspace/shared-models';

@Injectable()
export class ServiceRepo {
  constructor(private readonly uploader: FileUploadHelper) {}
  async create(
    data: CreateServiceDto,
    file?: any,
    userId?: number,
  ): Promise<ServiceEntity> {
    let image: string | undefined = undefined;
    if (file) image = await this.uploader.uploadFile(file, 'service-images');

    return db.$transaction(async (tx) => {
      const tenant = await tx.tenant.findUnique({
        where: { userId: userId },
      });
      return tx.service.create({
        data: { ...data, image: image, tenantId: tenant.id },
      });
    });
  }

  async findAll(params: {
    [key: string]: any;
  }): Promise<{ data: ServiceEntity[]; count: number }> {
    const tenantId = parseInt(params.tenantId, 10);
    const page = Number(params.page) || 1;
    const serachQuery = params.searchQuery || '';
    const skip = (page - 1) * AppConstants.paginationLimit;
    const results = await db.service.findMany({
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

    const count = await db.service.count({
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
  find(id: number): Promise<ServiceEntity> {
    return db.service.findUnique({ where: { id } });
  }
  async update(
    id: number,
    data: UpdateServiceDto,
    file: any,
  ): Promise<ServiceEntity> {
    let image: string | undefined = undefined;
    if (file) image = await this.uploader.uploadFile(file, 'service-images');
    return db.service.update({
      where: { id },
      data: {
        ...data,
        image: image,
      },
    });
  }

  delete(id: number): Promise<ServiceEntity> {
    return db.service.delete({ where: { id } });
  }
}
