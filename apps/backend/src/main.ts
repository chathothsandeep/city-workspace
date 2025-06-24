import 'reflect-metadata';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './all-exception.filter';
import { corsOptions } from './lib/corsOptions';
import * as path from 'path';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeOption } from './lib/validationPipeOPtions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const uploadsDir = path.join(process.cwd(), 'apps', 'backend', 'uploads');
  app.use('/uploads', express.static(uploadsDir));
  const config = app.get(ConfigService);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors(corsOptions(config));
  app.useGlobalPipes(new ValidationPipe(validationPipeOption));
  app.setGlobalPrefix('api/v1');
  await app.listen(config.get('general.port') ?? 8000);
}
void bootstrap();
