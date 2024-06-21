import { InjectRepository } from "@nestjs/typeorm";
import { UserSchema } from "./UserSchema";
import { BadRequestException, Injectable} from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./UserEntity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
  ) {}

    // find methods
    async findById(id: string): Promise<User> {
      const queryString = `SELECT * FROM users
      WHERE id = '${id}'
      `;
      const user = await this.userRepository.query(queryString);
      const userFormated = User.fromDatabase(user[0]);
      return userFormated;
    }
  
    async findByEmail(email: string): Promise<User> {
      const queryString = `SELECT * FROM users WHERE email = '${email}'`;
      const user = await this.userRepository.query(queryString);
      if(!user.length) return undefined;
      const userFormated = User.fromDatabase(user[0]);
      return userFormated;
    }
  
    async findAll(): Promise<User[]> {
      const queryString = `SELECT * FROM users `;
      const users:any[] = await this.userRepository.query(queryString);
      const usersFormated = users.map((user) => User.fromDatabase(user));
      return usersFormated;
    }
  
    async updateUser(userData: Partial<User>, userId:string) {
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
  
      const queryString = `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = '${userId}'`;
      try {
        await this.userRepository.query(queryString);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  }
  
