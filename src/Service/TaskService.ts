import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "src/Models/Task/TaskEntity";
import { TaskRepository } from "src/Models/Task/TaskRepository";
import { TaskSchema } from "src/Models/Task/TaskSchema";
import { Repository } from "typeorm";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskSchema)
        private repositoryTask:Repository<Task>,
        private readonly taskRepository:TaskRepository,
    ){}

    async findAll(input){
        const result = await this.taskRepository.findAll(input.decodedToken.userId);
        return result;
    }
}