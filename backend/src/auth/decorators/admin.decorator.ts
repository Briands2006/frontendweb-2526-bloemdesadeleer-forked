import { SetMetadata } from '@nestjs/common';

export const ADMIN_KEY = 'isAdmin';
export const IsAdmin = () => SetMetadata(ADMIN_KEY, true);
