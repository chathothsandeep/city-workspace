import { AddressEntity } from '../address/address.entity';
import { UserEntity } from '../user/user.entity';

export class TenantEntity {
  id!: number;
  name!: string;
  phone!: string;
  email!: string;
  website?: string | null;
  lat!: number;
  long!: number;
  logo?: string | null;
  address?: AddressEntity | null;
  userId?: number | null;
  user?: UserEntity | null;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data?: Partial<TenantEntity>) {
    Object.assign(this, data);
  }
}
