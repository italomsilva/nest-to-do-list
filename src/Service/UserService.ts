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
import { HashPassword } from '../utils/HashPassword';
import { JwtAuthService } from 'src/middleware/JwtAuthService';
import { DecodedToken } from 'src/middleware/TokenInterface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repositoryUser: Repository<UserSchema>,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async signUp(input: InputSignUp): Promise<UserSchema> {
    const verifyUser = await this.repositoryUser.findOneBy({
      email: input.email,
    });
    if (verifyUser) throw new ConflictException('EMAIL ALREADS IN USE');
    const password = await HashPassword.hashPassword(input.password);
    const newUser = this.repositoryUser.create({
      email: input.email,
      name: input.name,
      password: password,
      phone: input.phone ? input.phone : null,
    });
    const token = await this.jwtAuthService.generateToken(
      newUser.id,
      newUser.email,
    );
    newUser.authToken = token;
    try {
      await this.repositoryUser.save(newUser);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException('USER NOT SAVE');
    }
  }

  async signIn(input: InputSignIn): Promise<UserSchema> {
    const user = await this.repositoryUser.findOneBy({ email: input.email });
    if (!user) throw new UnauthorizedException('INVALID EMAIL OR PASSWORD');
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
    try {
      await this.repositoryUser.save(user);
    } catch (error) {
      throw new InternalServerErrorException('LOGIN FAILED');
    }
    return user;
  }

  async editUser(input: InputEditUser): Promise<any> {
    const user = await this.repositoryUser.findOneBy({
      id: input.decodedToken.userId,
    });
    if (!user) throw new NotFoundException('USER NOT FOUND');
    if (input.name) user.name = input.name;
    if (input.phone) user.phone = input.phone;
    if (input.newPassword) {
      if (!input.currentPassword)
        throw new BadRequestException('CURRENT PASSWORD IS NECESSARY');
      const passwordIsValid = await HashPassword.comparePassword(
        input.currentPassword,
        user.password,
      );
      if (passwordIsValid == false)
        throw new UnauthorizedException('INVALID CURRENT PASSWORD');
      const newPasswordHash = await HashPassword.hashPassword(
        input.newPassword,
      );
      user.password = newPasswordHash;
    }
    try {
      await this.repositoryUser.save(user);
    } catch (error) {
      throw new InternalServerErrorException('EDIT USER FAILED');
    }
    return { sucess: true };
  }

  async deleteUser(input: InputDelete) {
    if (input.email != input.decodedToken.email)
      throw new UnauthorizedException('USER UNAUTHORIZED');
    const login = await this.signIn(input);
    if (!login) throw new UnauthorizedException('INVALID EMAIL OR PASSWORD');
    try {
      await this.repositoryUser.delete({ email: input.email });
      return { sucess: true };
    } catch (error) {
      throw new InternalServerErrorException('DELETE USER FAILED');
    }
  }

  async findAll() {
    return await this.repositoryUser.find();
  }
}

type InputSignUp = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

type InputSignIn = {
  email: string;
  password: string;
};

type InputDelete = {
  decodedToken: DecodedToken;
  email: string;
  password: string;
};

type InputEditUser = {
  decodedToken: DecodedToken;
  name?: string;
  phone?: string;
  newPassword?: string;
  currentPassword?: string;
};
