import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from 'src/Models/User/UserSchema';
import { Repository } from 'typeorm';
import { User } from 'src/Models/User/UserEntity';
import { HashPassword } from '../utils/HashPassword';
import { JwtAuthService } from 'src/middleware/JwtAuthService';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async signUp(input: InputSignUp): Promise<any> {
    const verifyUser = await this.findByEmail(input.email);
    if(verifyUser)
      throw new ConflictException('EMAIL ALREADS IN USE');
    const newUser = new User(input);
    const saveUser = User.toDatabase(newUser);
    saveUser.password = await HashPassword.hashPassword(saveUser.password);
    await this.userRepository.save(saveUser);
    return newUser;
  }

  async singIn(input: InputSignIn): Promise<User> {
    const user = await this.findByEmail(input.email);
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
    await this.userRepository.query(`UPDATE users
      SET auth_token = '${user.authToken}'
      WHERE id = '${user.id}';
    `);
    return user;
  }

  // find methods
  async findById(id: string): Promise<User> {
    const queryString = `SELECT * FROM users
    WHERE id = '${id}'
    `;
    const user = await this.userRepository.query(queryString);
    if (!user || !user.length) {
      throw new NotFoundException('USER NOT FOUND');
    }
    const userFormated = User.fromDatabase(user[0]);
    return userFormated;
  }

  async findByEmail(email: string): Promise<User> {
    const queryString = `SELECT * FROM users
    WHERE email = '${email}'
    `;
    const user = await this.userRepository.query(queryString);
    if (!user || !user.length) {
      throw new NotFoundException(`USER NOT FOUND`);
    }
    const userFormated = User.fromDatabase(user[0]);
    return userFormated;
  }

  async findAll(): Promise<User[]> {
    const queryString = `SELECT * FROM users`;
    const users = await this.userRepository.query(queryString);
    const usersFormated: User[] = users.map((user) => User.fromDatabase(user));
    return usersFormated;
  }

  async updateUser(userData: Partial<User>) {
    const fields: string[] = [];

    if (userData.name) {
      fields.push(`name = '${userData.name}'`);
    }

    if (userData.password) {
      fields.push(`password = '${userData.password}'`);
    }

    if (userData.phone) {
      fields.push(`phone = '${userData.phone}'`);
    }

    if (fields.length === 0) {
      throw new BadRequestException('NO FIELDS TO UPDATE');
    }

    const queryString = `
        UPDATE users 
        SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
        WHERE id = '${userData.id}'
    `;
    try {
      await this.userRepository.query(queryString);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
}

type InputSignUp = {
  name: string;
  email: string;
  password: string;
};

type InputSignIn = {
  email: string;
  password: string;
};
