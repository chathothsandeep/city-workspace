import { Injectable } from '@nestjs/common';
import { CrudService } from '../../lib/crud';
import { AdminEntity } from '@city-workspace/shared-models';

@Injectable()
export class AdminRepo implements CrudService<AdminEntity> {
  findAll(params: { [key: string]: any }): Promise<AdminEntity[]> {
    throw new Error('Method not implemented.');
  }
  find(id: number): Promise<AdminEntity> {
    throw new Error('Method not implemented.');
  }
  create(data: any): Promise<AdminEntity> {
    throw new Error('Method not implemented.');
  }
  update(id: number, data: any): Promise<AdminEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<AdminEntity> {
    throw new Error('Method not implemented.');
  }
}
