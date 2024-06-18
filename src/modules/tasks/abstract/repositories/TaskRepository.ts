import { Task } from "../entities/Task.entitiy";

export interface TaskRepository {
    findAll(): Promise<Task[]>;

}