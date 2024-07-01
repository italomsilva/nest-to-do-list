import { Module } from '@nestjs/common';
import { Task } from './TaskEntity';
import { JwtAuthModule } from 'src/middleware/JwtAuthModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from 'src/Service/TaskService';
import { TaskController } from 'src/Controllers/TaskController';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), JwtAuthModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
