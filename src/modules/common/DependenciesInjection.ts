import { dataSource } from "../database/database";
import UserSchema from "../database/schemas/UserSchema";
import { MySqlUserRepository } from "../auth/implement/repositoriesMySql/MySqlUserRepositories";
import { FindAllUsersService } from "src/services/auth/FindAllUsersService";
import { SignUpService } from "src/services/auth/SIgnUpService";
import { MySqlTaskRepository } from "../tasks/implement/repositoriesMySql/MySqlTaskRepository";
import { TaskSchema } from "../database/schemas/TaskSchema";
import { FindAllTasksService } from "src/services/tasks/FindAllTasksService";
// REPOSITORIES
const mySqlUserRepository = new MySqlUserRepository(
    dataSource.getRepository(UserSchema)
);

const mySqlTaskRepository= new MySqlTaskRepository(
    dataSource.getRepository(TaskSchema)
);


// SERVICES
const findAllUsersService = new FindAllUsersService(
    mySqlUserRepository
);

const signUpService = new SignUpService(
    mySqlUserRepository
);

const findAllTasksService = new FindAllTasksService(
    mySqlTaskRepository
)

export{
    findAllUsersService,
    signUpService,
    findAllTasksService
};