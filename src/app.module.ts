import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/databaseModule';
import { AuthModule } from './modules/auth/AuthModule';
import { TaskModule } from './modules/tasks/TaskModule';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    TaskModule
  ],
})
export class AppModule {}
