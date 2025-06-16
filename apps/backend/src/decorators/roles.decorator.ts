import { UserRoles } from '@city-workspace/common-utils';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (roles?: string[]) =>
  SetMetadata(ROLES_KEY, roles ?? [UserRoles.USER]);
