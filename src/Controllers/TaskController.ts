import { Body, Controller, Post } from "@nestjs/common";
import { TaskService } from "src/Service/TaskService";

@Controller('task')
export class TaskController{
    constructor(
        private readonly taskService:TaskService
    ){}

    @Post('find-all')
    async findAll(@Body() body){
        const result = await this.taskService.findAllUserTasks(body);
        return result;
    }

    @Post('create')
    async createTask(@Body() body){
        const result = await this.taskService.createTask(body);
        return result;
    }
}