import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private readonly jwtService: JwtService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = this.extractToken(request);
    if (!authorization) throw new UnauthorizedException('Token not found');
    try {
      const payload = this.jwtService.verify(authorization, { secret: process.env.JWT_SECRET });
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  private extractToken(request: Request): string {
    const [type, token] = request.headers['authorization']?.split(' ') || [];
    return type === 'Bearer' ? token : null;
  }
}
