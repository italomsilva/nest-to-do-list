import {  Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { FindAllTasksService } from 'src/services/tasks/FindAllTasksService';

@Controller('task')
export class TaskController {
  constructor(
    private readonly findAllTasksService:FindAllTasksService
  ) {}

  @Get('find-all')
  async findAllUsers(@Res() response: Response): Promise<Response> {
    try {
      const output = await this.findAllTasksService.execute();
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }
}
