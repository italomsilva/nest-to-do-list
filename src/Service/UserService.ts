import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from 'src/Models/User/UserSchema';
import { Repository } from 'typeorm';
import { User } from 'src/Models/User/UserEntity';
import { HashPassword } from '../utils/HashPassword';
import { JwtAuthService } from 'src/middleware/JwtAuthService';
import { UserRepository } from 'src/Models/User/UserRepository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repositoryUser: Repository<UserSchema>,
    private readonly userRepository: UserRepository,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async signUp(input: InputSignUp): Promise<User> {
    const verifyUser = await this.userRepository.findByEmail(input.email);
    if (verifyUser) throw new ConflictException('EMAIL ALREADS IN USE');
    const password = await HashPassword.hashPassword(input.password);
    const newUser = new User({
      email: input.email,
      name: input.name,
      password: password,
      phone: input.phone
    });
    const token = await this.jwtAuthService.generateToken(newUser.id, newUser.email);
    newUser.authToken= token;
    try {
      await this.repositoryUser.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException('USER NOT SAVE');
    }
    return newUser;
  }

  async signIn(input: InputSignIn): Promise<User> {
    const user = await this.userRepository.findByEmail(input.email);
    if(!user) throw new UnauthorizedException('INVALID EMAIL OR PASSWORD')
    const passwordIsValid = await HashPassword.comparePassword(
      input.password,
      user.password,
    );
    if (passwordIsValid == false) {
      throw new UnauthorizedException('INVALID EMAIL OR PASSWORD');
    }
    user.authToken = await this.jwtAuthService.generateToken(
      user.id,
      user.email,
    );
    await this.repositoryUser.query(`UPDATE users
      SET auth_token = '${user.authToken}'
      WHERE id = '${user.id}';
    `);
    return user;
  }

  async editUser(input: InputEditUser): Promise<any> {
    const user = await this.userRepository.findById(input.decodedToken.userId);
    if (!user) throw new NotFoundException('USER NOT FOUND');
    if(!input.newPassword){
      await this.userRepository.updateUser(input, input.decodedToken.userId);
    } else {
      if(!input.currentPassword) throw new BadRequestException('CURRENT PASSWORD IS NECESSARY');
      const passwordIsValid = await HashPassword.comparePassword(input.currentPassword, user.password);
      if(passwordIsValid==false) throw new UnauthorizedException('INVALID CURRENT PASSWORD'); 
      const newPasswordHash = await HashPassword.hashPassword(input.newPassword); 
      user.password=newPasswordHash;
      await this.userRepository.updateUser(user, input.decodedToken.userId);  
    }
    return { sucess: true };
  }

  async deleteUser(input:InputDelete){
    if(input.email != input.decodedToken.email) throw new UnauthorizedException('USER UNAUTHORIZED');
    const login = await this.signIn(input);
    if(!login) throw new UnauthorizedException('INVALID EMAIL OR PASSWORD');
    const queryString = `DELETE FROM users WHERE email = '${input.decodedToken.email}';`
    try {
    await this.repositoryUser.query(queryString);
    return{ sucess: true }
    } catch (error) {
      return {sucess: false, error: error}
    }
  }

  async findAll() {
    return await this.userRepository.findAll();
  }
}

type InputSignUp = {
  name: string;
  email: string;
  password: string;
  phone?:string;
};

type InputSignIn = {
  email: string;
  password: string;
};


type InputDelete = {
  decodedToken:{
    email:string;
  }
  email: string;
  password: string;
};

type InputEditUser = {
  decodedToken: {
    userId: string;
    email: string;
  };
  name?: string;
  phone?: string;
  newPassword?: string;
  currentPassword?:string;
};
