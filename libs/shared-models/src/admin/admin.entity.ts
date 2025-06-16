export class AdminEntity {
  public id!: number;
  public email!: string;
  public name!: string;
  public phone!: string;
  public department?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data?: Partial<AdminEntity>) {
    Object.assign(this, data);
  }
}
