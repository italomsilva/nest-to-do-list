import { User } from "src/modules/auth/abstract/entities/User.entity";
import { UserRepository } from "src/modules/auth/abstract/repositories/UserRepository";

export class FindAllUsersService {
    constructor(
        private readonly userRepository:UserRepository
    ){}

    async execute():Promise<User[]>{
        return this.userRepository.findAll();
    }
}