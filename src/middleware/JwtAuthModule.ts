// auth.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './JwtAuthService';
import { JwtAuthMiddleware } from './JwtAuthMiddleware';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtAuthService],
  exports: [JwtAuthService],
})
export class JwtAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes('u/find-all');
  }
}

