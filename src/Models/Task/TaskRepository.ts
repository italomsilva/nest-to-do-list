import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskSchema } from "./TaskSchema";
import { Repository } from "typeorm";
import { Task } from "./TaskEntity";

@Injectable()
export class TaskRepository{
    constructor(
        @InjectRepository(TaskSchema)
        private taskRepository: Repository<TaskSchema>
    ){}

    async findAllByUserId(userId:string):Promise<Task[]>{
        const queryString = `SELECT * FROM tasks WHERE owner_user = '${userId}'`
        const tasks = await this.taskRepository.query(queryString);
        const formatedTasks = tasks.map((task)=>Task.fromDatabase(task));
        return formatedTasks;
    }

    async findById(taskId:string): Promise<Task>{
        const queryString = `SELECT * FROM tasks WHERE id = '${taskId}'`;
        const task = await this.taskRepository.query(queryString);
        return Task.fromDatabase(task[0]);
    }

} 