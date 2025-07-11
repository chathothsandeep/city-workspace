import { TenantEntity } from '../tenant/tenant.entity';

export class ServiceEntity {
  id!: number;
  createdAt?: Date;
  updatedAt?: Date;
  tenantId?: number;
  tenant?: TenantEntity;
  name!: string;
  description!: string;
  tags?: string[];
  image?: string;
  price!: number;
  priceSymbol?: string;

  constructor(data: Partial<ServiceEntity>) {
    Object.assign(this, data);
  }
}
