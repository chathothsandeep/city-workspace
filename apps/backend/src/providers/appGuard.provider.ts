import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/role.guard';

export const AppThrottleGuardProvider = {
  provide: 'APP_GUARD',
  useClass: ThrottlerGuard,
};

export const GlobalAuthGuardProvider = {
  provide: 'APP_GUARD',
  useClass: AuthGuard,
};

export const GlobalRoleGuardProvider = {
  provide: 'APP_GUARD',
  useClass: RolesGuard,
};
