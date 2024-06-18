import { Task } from "src/modules/tasks/abstract/entities/Task.entitiy";
import { TaskRepository } from "src/modules/tasks/abstract/repositories/TaskRepository";

export class FindAllTasksService {
    constructor(
        private readonly taskRepository:TaskRepository
    ){}

    async execute():Promise<Task[]>{
        const result = await this.taskRepository.findAll();
        return result;
    }
}