import {
  AddressEntity,
  CreateAddressDto,
  UpdateAddressDto,
} from '@city-workspace/shared-models';
import { CrudService } from '../../lib/crud';

import { selectedAddressFields } from '../../lib/selectedFileds/addressFields';
import { LogHelper } from '../../lib/helpers/log.helper';
import { db } from '../../lib/db';
export class AddressRepo implements CrudService<AddressEntity> {
  async findAll(params: { [key: string]: any }): Promise<AddressEntity[]> {
    if (params.id) {
      return await db.address.findMany({
        where: {
          id: {
            equals: params.id,
          },
        },
        select: selectedAddressFields,
      });
    }
    return db.address.findMany({
      select: selectedAddressFields,
    });
  }
  async find(id: number): Promise<AddressEntity | null> {
    return await db.address.findUnique({
      where: {
        id: id,
      },
      select: selectedAddressFields,
    });
  }
  async create(data: CreateAddressDto): Promise<AddressEntity | null> {
    LogHelper.getInstance().log(data, 'repo');
    return await db.address.create({
      data: data,
      select: selectedAddressFields,
    });
  }
  async update(
    id: number,
    data: UpdateAddressDto,
  ): Promise<AddressEntity | null> {
    return await db.address.update({
      where: {
        id: id,
      },
      data: data,
      select: selectedAddressFields,
    });
  }
  async delete(id: number): Promise<AddressEntity | null> {
    return await db.address.delete({
      where: {
        id: id,
      },
      select: selectedAddressFields,
    });
  }
}
