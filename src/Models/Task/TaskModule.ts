import { Module } from "@nestjs/common";
import { TaskSchema } from "./TaskSchema";
import { JwtAuthModule } from "src/middleware/JwtAuthModule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskService } from "src/Service/TaskService";
import { TaskRepository } from "./TaskRepository";
import { TaskController } from "src/Controllers/TaskController";

@Module({
    imports:[TypeOrmModule.forFeature([TaskSchema]), JwtAuthModule],
    providers:[TaskService, TaskRepository],
    controllers:[TaskController]
})
export class TaskModule{}