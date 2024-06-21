import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "src/Models/Task/TaskEntity";
import { TaskRepository } from "src/Models/Task/TaskRepository";
import { TaskSchema } from "src/Models/Task/TaskSchema";
import { Repository } from "typeorm";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskSchema)
        private readonly repositoryTask:Repository<TaskSchema>,
        private readonly taskRepository:TaskRepository,
    ){}

    async findAllUserTasks(input){
        const result = await this.taskRepository.findAll(input.decodedToken.userId);
        return result;
    }

    async createTask(input:InputCreate):Promise<Task>{
        if(input.type == "routine" || input.type == "regular"){
            if(!input.duration) throw new BadRequestException(`DURATION IS REQUIRED FOR "${input.type}" TASKS`)
        }
        const newTask = new Task({
            title: input.title,
            description: input.description? input.description: null,
            duration: input.duration? input.duration:null,
            type: input.type? input.type : "default",
            ownerUser: input.decodedToken.userId? input.decodedToken.userId : "1",
        });
        try {
            await this.repositoryTask.save(newTask);
            return newTask;
        } catch (error){
            throw new InternalServerErrorException(`TASK NOT SAVED \n ERROR: ${error}`)
        }

    }
}

type InputCreate = {
    decodedToken:{
        userId:string
    };
    title: string;
    description?: string;
    duration?: number;
    type?: string;  
}