import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';
export const ROLER_KEY = 'roles';
export const Roles = (role: Role) => SetMetadata(ROLER_KEY, role);
