import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from '../Models/User/UserSchema';
import { Repository } from 'typeorm';
import { User } from 'src/Models/User/UserEntity';
import { HashPassword } from './HashPassword';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
  ) {}

  async findOneById(id: string): Promise<User> {
    const queryString = `SELECT * FROM users
        WHERE id = '${id}'
    `;
    const user = await this.userRepository.query(queryString);
    if (!user || !user.length) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const userFormated = User.fromDatabase(user[0]);
    return userFormated;
  }

  async signUp(data:InputSignUp):Promise<User>{
    const newUser = new User(data);
    const saveUser = User.toDatabase(newUser);
    saveUser.password = await HashPassword.hashPassword(saveUser.password);
    await this.userRepository.save(saveUser);
    return newUser;
  }

}

type InputSignUp = {
  name:string;
  email:string;
  password:string;
}
