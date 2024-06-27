import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/Models/Task/TaskEntity';
import { TaskRepository } from 'src/Models/Task/TaskRepository';
import { TaskSchema } from 'src/Models/Task/TaskSchema';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskSchema)
    private readonly repositoryTask: Repository<TaskSchema>,
    private readonly taskRepository: TaskRepository,
  ) {}

  async findAllUserTasks(input) {
    const result = await this.taskRepository.findAllByUserId(
      input.decodedToken.userId,
    );
    return result;
  }

  async createTask(input: InputCreate): Promise<Task> {
    if (input.type == 'routine' || input.type == 'regular') {
      if (!input.duration)
        throw new BadRequestException(`DURATION IS REQUIRED FOR "${input.type}" TASKS`);
    }
    const newTask = new Task({
      title: input.title,
      description: input.description ? input.description : null,
      duration: input.duration ? input.duration : null,
      type: input.type ? input.type : 'default',
      ownerUser: input.decodedToken.userId ? input.decodedToken.userId : '1',
    });
    try {
      await this.repositoryTask.save(newTask);
      return newTask;
    } catch (error) {
      throw new InternalServerErrorException(`TASK NOT SAVED \n ERROR: ${error}`);
    }
  }

  async deleteTask(input: InputDelete) {
    const task = await this.taskRepository.findById(input.taskId);
    if (!task) throw new NotFoundException('TASK NOT FOUND');
    if (task.ownerUser != input.decodedToken.userId)
      throw new UnauthorizedException();
    try {
      const queryString = `DELETE FROM tasks WHERE id = '${input.taskId}';`;
      await this.repositoryTask.query(queryString);
    } catch (error) {
      return {
        sucess: false,
        error: error,
      };
    }
    return {
      sucess: true,
    };
  }

  async editTask(input: InputEdit) {
    const task = await this.taskRepository.findById(input.taskId);
    if (!task) throw new NotFoundException('TASK NOT FOUNND');
    if (task.ownerUser != input.decodedToken.userId)
      throw new UnauthorizedException();
    return await this.taskRepository.updateTask(input);
  }

  async changeCompleted(input:InputDelete){
    const task = await this.taskRepository.findById(input.taskId);
    if(!task) throw new NotFoundException('TASK NOT FOUND');
    try {
        const queryString = `UPDATE tasks SET completed = ${(!task.completed)} WHERE id = '${input.taskId}'`;
        await this.repositoryTask.query(queryString);
        return {
          sucess: true
        };
    } catch (err) {
        return {
          sucess:false,
          error: err
        }
    }

  }
}

type InputCreate = {
  decodedToken: {
    userId: string;
  };
  title: string;
  description?: string;
  duration?: number;
  type?: string;
};

type InputDelete = {
  decodedToken: {
    userId: string;
  };
  taskId: string;
};

type InputEdit = {
  decodedToken: {
    userId: string;
  };
  taskId: string;
  title?: string;
  description?: string;
  duration?: number;
  type?: string;
};
