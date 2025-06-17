import { Injectable } from '@nestjs/common';
import { CrudService } from '../../lib/crud';
import { UpdateUserDto, UserEntity } from '@city-workspace/shared-models';

import { selectedUserFields } from '../../lib/selectedFileds/user.field';
import { db } from '../../lib/db';

@Injectable()
export class UserRepo implements CrudService<UserEntity> {
  create(data: any): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  async findAll(params: { [key: string]: any }): Promise<UserEntity[]> {
    if (params.role) {
      return await db.user.findMany({
        where: {
          role: {
            equals: params.role,
          },
        },
        select: selectedUserFields,
      });
    }
    return db.user.findMany({
      select: selectedUserFields,
    });
  }

  async find(id: number): Promise<UserEntity | null> {
    return await db.user.findUnique({
      where: {
        id: id,
      },
      select: selectedUserFields,
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<UserEntity | null> {
    return await db.user.update({
      where: {
        id: id,
      },
      data: data,
      select: selectedUserFields,
    });
  }

  async updateFew(id: number, data: UpdateUserDto): Promise<UserEntity | null> {
    return await db.user.update({
      where: {
        id: id,
      },
      data: data,
      select: selectedUserFields,
    });
  }
  async delete(id: number): Promise<UserEntity | null> {
    return await db.user.delete({
      where: {
        id: id,
      },
      select: selectedUserFields,
    });
  }
}
