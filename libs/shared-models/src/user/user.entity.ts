import { AddressEntity } from '../address/address.entity';
export class UserEntity {
  public id!: number;
  public email!: string;
  public name!: string;
  public role!: string;
  public password?: string;
  public tokens?: TokenEntity[];
  public createdAt?: Date;
  public updatedAt?: Date;
  public addresses?: AddressEntity[];

  constructor(data?: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}

export class TokenEntity {
  public id?: number;
  public token!: string;
  public expirestAt!: Date;
  public userId!: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data?: Partial<TokenEntity>) {
    Object.assign(this, data);
  }
}
