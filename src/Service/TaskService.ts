import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DecodedToken } from 'src/middleware/TokenInterface';
import { Task } from 'src/Models/Task/TaskEntity';
import { validateSchema } from 'src/Models/Task/TaskValidateSchema';
import { Validator } from 'src/utils/Validator';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAllUserTasks(input: {
    decodedToken: DecodedToken;
  }): Promise<Task[]> {
    Validator.validateInput(input, validateSchema.findAll);
    const result = await this.taskRepository.findBy({
      ownerUser: input.decodedToken.userId,
    });
    return result;
  }

  async createTask(input: InputCreate): Promise<Task> {
    Validator.validateInput(input, validateSchema.create);
    if (input.type == 'routine' || input.type == 'regular') {
      if (!input.duration)
        throw new BadRequestException(
          `DURATION IS REQUIRED FOR "${input.type}" TASKS`,
        );
    }
    const newTask = this.taskRepository.create({
      title: input.title,
      description: input.description ? input.description : null,
      duration: input.duration ? input.duration : null,
      type: input.type ? input.type : 'default',
      ownerUser: input.decodedToken.userId ? input.decodedToken.userId : '1',
      completed: false,
    });
    try {
      await this.taskRepository.save(newTask);
      return newTask;
    } catch (error) {
      throw new InternalServerErrorException(
        `TASK NOT SAVED \n ERROR: ${error}`,
      );
    }
  }

  async editTask(input: InputEdit) {
    Validator.validateInput(input, validateSchema.edit);
    const task = await this.taskRepository.findOneBy({ id: input.taskId });
    if (!task) throw new NotFoundException('TASK NOT FOUNND');
    if (task.ownerUser != input.decodedToken.userId)
      throw new UnauthorizedException();
    if (input.title) task.title = input.title;
    if (input.description) task.description = input.description;
    if (input.duration) task.duration = input.duration;
    if (input.type) task.type = input.type;
    return await this.taskRepository.save(task);
  }

  async changeCompleted(input: InputDelete) {
    Validator.validateInput(input, validateSchema.changeCompleted);
    const task = await this.taskRepository.findOneBy({ id: input.taskId });
    if (!task) throw new NotFoundException('TASK NOT FOUND');
    if (input.decodedToken.userId != task.ownerUser)
      throw new UnauthorizedException('UNAUTHORIZED USER');
    try {
      await this.taskRepository.update(
        { id: input.taskId },
        { completed: !task.completed },
      );
      return {
        sucess: true,
      };
    } catch (err) {
      return {
        sucess: false,
        error: err,
      };
    }
  }

  async deleteTask(input: InputDelete) {
    Validator.validateInput(input, validateSchema.delete);
    const task = await this.taskRepository.findOneBy({ id: input.taskId });
    if (!task) throw new NotFoundException('TASK NOT FOUND');
    if (task.ownerUser != input.decodedToken.userId)
      throw new UnauthorizedException();
    try {
      await this.taskRepository.delete({ id: input.taskId });
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
}

type InputCreate = {
  decodedToken: DecodedToken;
  title: string;
  description?: string;
  duration?: number;
  type?: string;
};

type InputDelete = {
  decodedToken: DecodedToken;
  taskId: string;
};

type InputEdit = {
  decodedToken: DecodedToken;
  taskId: string;
  title?: string;
  description?: string;
  duration?: number;
  type?: string;
};
