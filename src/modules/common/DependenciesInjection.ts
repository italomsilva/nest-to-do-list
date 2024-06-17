import { dataSource } from "../database/database";
import UserSchema from "../database/Schemas/UserSchema";
import { MySqlUserRepository } from "../auth/implement/repositoriesMySql/MySqlUserRepositories";
import { FindAllUsersService } from "src/services/auth/FindAllUsersService";
import { SignUpService } from "src/services/auth/SIgnUpService";
// REPOSITORIES
const mySqlUserRepository = new MySqlUserRepository(
    dataSource.getRepository(UserSchema)
);


// SERVICES
const findAllUsersService = new FindAllUsersService(
    mySqlUserRepository
);

const signUpService = new SignUpService(
    mySqlUserRepository
);

export{
    findAllUsersService,
    signUpService
};