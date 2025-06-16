import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpErrorHelper {
  static handleError(error: any) {
    if (error.code && error.code === 'P2002') {
      throw new HttpException('Unique constraint failed', HttpStatus.CONFLICT);
    }
    if (error.code && error.code === 'P2025') {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    } else {
      throw new HttpException(
        `${error.message != null ? error.message : error}`,
        error.status != null ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
