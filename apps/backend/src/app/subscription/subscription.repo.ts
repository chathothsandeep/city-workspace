import { Injectable } from '@nestjs/common';
import { CrudService } from '../../lib/crud';
import {
  CreateSubscriptionDto,
  SubscriptionEntity,
  UpdateSubscriptionDto,
} from '@city-workspace/shared-models';
import { db } from '../../lib/db';

@Injectable()
export class SubscriptionRepo implements CrudService<SubscriptionEntity> {
  create(data: CreateSubscriptionDto): Promise<SubscriptionEntity> {
    return db.subscription.create({ data });
  }
  findAll(params: { [key: string]: any }): Promise<SubscriptionEntity[]> {
    return db.subscription.findMany({
      where: { ...params },
      orderBy: { sortOrder: 'asc' },
    });
  }
  find(id: number): Promise<SubscriptionEntity> {
    return db.subscription.findUnique({ where: { id } });
  }
  update(id: number, data: UpdateSubscriptionDto): Promise<SubscriptionEntity> {
    return db.subscription.update({ where: { id }, data });
  }

  updateFew(
    id: number,
    data: UpdateSubscriptionDto,
  ): Promise<SubscriptionEntity> {
    return db.subscription.update({ where: { id }, data });
  }
  delete(id: number): Promise<SubscriptionEntity> {
    return db.subscription.delete({ where: { id } });
  }
}
