import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { TestController } from './controllers/TestController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/TypeOrmConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig)
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
