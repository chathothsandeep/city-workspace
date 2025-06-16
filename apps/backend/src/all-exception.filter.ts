import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { LogHelper } from './lib/helpers/log.helper';

type ErrorResponseObject = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = LogHelper.getInstance();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponseObj: ErrorResponseObject = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: '',
    };

    if (exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus();
      myResponseObj.message = exception.getResponse();
    } else {
      myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponseObj.message = 'Internal Server Error';
    }

    response.status(myResponseObj.statusCode).json(myResponseObj);
    super.catch(exception, host);
  }
}
