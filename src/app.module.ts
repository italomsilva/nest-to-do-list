import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './Models/User/UserModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/database';
import { AuthKeyMiddleware } from './middleware/AuthKeyMiddleware';
import { JwtAuthModule } from './middleware/JwtAuthModule';
import { TaskModule } from './Models/Task/TaskModule';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtAuthModule,
    UserModule,
    TaskModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthKeyMiddleware).forRoutes('*');
  }
}
