import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenHelper {
  constructor(private readonly jwtService: JwtService) {}

  getPayload(token: string) {
    const payload = this.jwtService.decode(token);
    return payload;
  }

  getToken(req: any) {
    return req.headers.authorization?.split(' ')[1];
  }
}
