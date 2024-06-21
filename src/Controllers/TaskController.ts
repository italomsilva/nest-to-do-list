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

    @Post('delete')
    async deleteTask(@Body() body){
        const result = await this.taskService.deleteTask(body);
        return result;
    }

    @Post('edit')
    async editTask(@Body() body){
        const result = await this.taskService.editTask(body);
        return result;
    }
}