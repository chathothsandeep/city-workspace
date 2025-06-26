import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  TokenEntity,
  UserEntity,
} from '@city-workspace/shared-models';
import { db } from '../../lib/db';

@Injectable()
export default class AuthRepo {
  async login(email: string): Promise<UserEntity | null> {
    return db.user.findUnique({
      where: {
        email,
      },
      include: {
        tenant: true,
        tokens: {
          take: 1,
          skip: 0,
          select: {
            id: true,
            token: true,
            expirestAt: true,
            userId: true,
          },
        },
      },
    });
  }

  async signUp(
    dto: CreateUserDto,
    password: string,
  ): Promise<UserEntity | null> {
    const { password: _, ...rest } = dto;
    return await db.user.create({
      data: {
        ...rest,
        password: password,
      },
    });
  }

  async createToken(token: TokenEntity) {
    return await db.token.create({
      data: token,
      select: {
        id: true,
        token: true,
        expirestAt: true,
        userId: true,
      },
    });
  }

  async deleteToken(id: number): Promise<void> {
    await db.token.delete({
      where: {
        id: id,
      },
    });
  }
}
