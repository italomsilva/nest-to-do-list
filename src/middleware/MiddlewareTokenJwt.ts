import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './AuthService';

@Injectable()
export class JwtMiddleware extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(tokenComplete:string) {
    const user = await this.authService.validateToken(tokenComplete);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
