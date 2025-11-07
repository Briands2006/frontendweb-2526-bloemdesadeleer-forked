import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class CheckUserAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException('You need to be signed in');
    }

    const { id: userId, admin } = request.user;

    const id = request.params.id;

    const isOwner = id === 'me' || id === String(userId);
    const isAdmin = admin === true;

    if (!isOwner && !isAdmin) {
      throw new NotFoundException(
        'No user with this id exists or you do not have permission to view it.',
      );
    }

    return true;
  }
}
