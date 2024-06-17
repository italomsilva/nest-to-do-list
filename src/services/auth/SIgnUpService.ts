import { User } from "src/modules/auth/abstract/entities/User.entity";
import { UserRepository } from "src/modules/auth/abstract/repositories/UserRepository";

export class SignUpService{
    constructor(
        private readonly userRepository:UserRepository
    ){}

    async execute(body:Input):Promise<User>{
        const newUser = User.create(body);
        await this.userRepository.save(newUser);
        return newUser;
    }
}

type Input ={
    name:string,
    email:string,
    password:string,
    phone?:string,
}