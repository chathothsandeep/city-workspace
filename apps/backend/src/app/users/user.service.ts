import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepo } from './user.repo';
import { HttpErrorHelper } from '../../lib/helpers/httpError.helper';
import { UserRoles } from '@city-workspace/common-utils';
import { UpdateUserDto } from '@city-workspace/shared-models';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepo) {}
  async findAll(role?: UserRoles) {
    try {
      const users = await this.repo.findAll({ role });
      if (!users || users.length === 0) {
        throw new HttpException('No Users Found', HttpStatus.NOT_FOUND);
      }
      return users;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.repo.find(id);
      if (!user) {
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.repo.update(id, updateUserDto);
      if (!updatedUser) {
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      }
      return updatedUser;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const deletedUser = await this.repo.delete(id);
      if (!deletedUser) {
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      }
      return { message: 'User deleted successfully' };
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
}
