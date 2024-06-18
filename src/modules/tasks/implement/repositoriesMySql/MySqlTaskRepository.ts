import { Task } from "../../abstract/entities/Task.entitiy";
import { TaskRepository } from "../../abstract/repositories/TaskRepository";

export class MySqlTaskRepository implements TaskRepository{
    constructor(
        private repository:any
    ){}
    async findAll(): Promise<Task[]> {
        const queryString = `
            SELECT * FROM tasks;
        `;
        const result = await this.repository.query(queryString);
        return Task.createFromArray(result);
    }

}