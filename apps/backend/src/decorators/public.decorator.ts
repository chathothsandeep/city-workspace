import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = (isPublic?: boolean) =>
  SetMetadata(IS_PUBLIC_KEY, isPublic ?? false);
