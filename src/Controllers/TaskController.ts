import { Body, Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";
import { TaskService } from "src/Service/TaskService";

@Controller('task')
export class TaskController{
    constructor(
        private readonly taskService:TaskService
    ){}

    @Get('find-all')
    async findAll(@Body() body){
        const result = await this.taskService.findAllUserTasks(body);
        return result;
    }

    @Post('create')
    async createTask(@Body() body){
        const result = await this.taskService.createTask(body);
        return result;
    }

    @Delete('delete')
    async deleteTask(@Body() body){
        const result = await this.taskService.deleteTask(body);
        return result;
    }

    @Put('edit')
    async editTask(@Body() body){
        const result = await this.taskService.editTask(body);
        return result;
    }

    @Patch('toggle-completed')
    async toggleCompleted(@Body() body){
        const result = await this.taskService.changeCompleted(body);
        return result;
    }
}