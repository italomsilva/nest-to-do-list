import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtAuthService } from './JwtAuthService';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtauthService: JwtAuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['auth-token'] as string | undefined;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    let token: string;
    // Se o token não estiver no formato esperado, usa o valor do cabeçalho como token
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {
      token = authHeader;
    }

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const user = await this.jwtauthService.validateToken(token);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
