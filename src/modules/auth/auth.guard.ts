import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWTPayload } from './token/token.type';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private logger: PinoLogger,
  ) {
    this.logger.setContext(AuthGuard.name);
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload: JWTPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      request['user'] = payload;
    } catch (error) {
      this.logger.warn('JWT verification failed', {
        error: error.message as string,
        name: error.name as string,
      });

      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }

      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
}
