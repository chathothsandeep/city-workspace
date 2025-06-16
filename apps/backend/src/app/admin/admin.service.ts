import { Injectable } from '@nestjs/common';
import { AdminRepo } from './admin.repo';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepo: AdminRepo) {}

  create() {
    const admin = this.adminRepo.create({});
    return admin;
  }

  findAll(params: any) {
    return this.adminRepo.findAll(params);
  }

  findOne(id: number) {
    return this.adminRepo.find(id);
  }

  update(id: number) {
    return this.adminRepo.update(id, {});
  }

  remove(id: number) {
    return this.adminRepo.delete(id);
  }
}
