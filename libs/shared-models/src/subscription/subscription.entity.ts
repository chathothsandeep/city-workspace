export class SubscriptionEntity {
  id!: number;
  name!: string;
  features!: string[];
  isPopular!: boolean;
  isActive!: boolean;
  cost!: number;
  priceSymbol!: string;
  costDuration!: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data?: Partial<SubscriptionEntity>) {
    Object.assign(this, data);
  }
}
