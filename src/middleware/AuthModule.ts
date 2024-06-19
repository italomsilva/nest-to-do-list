// auth.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthKeyMiddleware } from 'src/middleware/MiddlewareAuthKey';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthKeyMiddleware).forRoutes('*');
    }
  }
