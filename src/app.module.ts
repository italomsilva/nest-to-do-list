import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './Models/User/UserModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/database';
import { AuthKeyMiddleware } from './middleware/MiddlewareAuthKey';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './middleware/AuthModule';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
