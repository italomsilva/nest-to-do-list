import { Module } from "@nestjs/common";
import { FindAllTasksService } from "src/services/tasks/FindAllTasksService";
import { findAllTasksService } from "../common/DependenciesInjection";
import { TaskController } from "src/controllers/TaskController";

@Module({
    providers: [
        {
            provide: FindAllTasksService,
            useValue: findAllTasksService
        }
    ],
    controllers:[TaskController]
})
export class TaskModule {}