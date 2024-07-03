import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "src/models/task/TaskEntity";
import { User } from "src/models/user/UserEntity";

export const typeOrmConfig:TypeOrmModuleOptions= {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Task],
    autoLoadEntities: true,
    synchronize: true,
  }