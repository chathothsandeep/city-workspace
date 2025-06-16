import { UserEntity } from '../user/user.entity';

export class AddressEntity {
  id?: number;
  fullName!: string;
  mobile!: string;
  addressOne!: string;
  adrressTwo?: string | null;
  latitude!: number;
  longitude!: number;
  zip?: number | null;
  landmark?: string | null;
  country!: string;
  state!: string;
  city?: string | null;
  userId?: number | null;
  user?: UserEntity | null;

  constructor(data?: Partial<AddressEntity>) {
    Object.assign(this, data);
  }
}
