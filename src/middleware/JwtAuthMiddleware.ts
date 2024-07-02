import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtAuthService } from './JwtAuthService';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtauthService: JwtAuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['auth-token'] as string | undefined;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization token missing');
    }

    let token: string;
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
      req.body.decodedToken = {
        userId: user.userId,
        email: user.email
      };
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
