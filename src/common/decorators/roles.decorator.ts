import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

// Decorador personalizado para roles 
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);