import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubscriptionRepo } from './subscription.repo';
import {
  CreateSubscriptionDto,
  SubscriptionEntity,
  UpdateSubscriptionDto,
} from '@city-workspace/shared-models';
import { HttpErrorHelper } from '../../lib/helpers/httpError.helper';

@Injectable()
export class SubscriptionService  {
  constructor(private readonly repo: SubscriptionRepo) {}
  async create(data: CreateSubscriptionDto): Promise<SubscriptionEntity> {
    try {
      const subscription = await this.repo.create(data);
      if (!subscription) {
        throw new HttpException(
          'Subscription cannot be created',
          HttpStatus.BAD_REQUEST,
        );
      }
      return subscription;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
  async findAll(params: { [key: string]: any }): Promise<SubscriptionEntity[]> {
    try {
      const subscriptions = await this.repo.findAll(params);
      if (!subscriptions || subscriptions.length === 0) {
        throw new HttpException('No subscriptions found', HttpStatus.NOT_FOUND);
      }
      return subscriptions;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
  async find(id: number): Promise<SubscriptionEntity> {
    try {
      const subscription = await this.repo.find(id);
      if (!subscription) {
        throw new HttpException('Subscription not found', HttpStatus.NOT_FOUND);
      }
      return subscription;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
  async update(
    id: number,
    data: UpdateSubscriptionDto,
  ): Promise<SubscriptionEntity> {
    try {
      const subscription = await this.repo.update(id, data);
      if (!subscription) {
        throw new HttpException('Subscription not found', HttpStatus.NOT_FOUND);
      }
      return subscription;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }

  async updateFew(
    id: number,
    data: UpdateSubscriptionDto,
  ): Promise<SubscriptionEntity> {
    try {
      const subscription = await this.repo.updateFew(id, data);
      if (!subscription) {
        throw new HttpException('Subscription not found', HttpStatus.NOT_FOUND);
      }
      return subscription;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
  async delete(id: number): Promise<SubscriptionEntity> {
    try {
      const subscription = await this.repo.delete(id);
      if (!subscription) {
        throw new HttpException('Subscription not found', HttpStatus.NOT_FOUND);
      }
      return subscription;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
}
