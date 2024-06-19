import { Repository } from 'typeorm';
import { UserSchema } from './UserSchema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<UserSchema> {
  async findById(id: string): Promise<UserSchema> {
    return this.findOne({ where: { id } });
  }
}
