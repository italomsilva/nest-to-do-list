import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../../Controllers/UserController';
import { UserService } from '../../Service/UserService';
import { UserRepository } from './UserRepository';
import { UserSchema } from './UserSchema';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [UserService, UserRepository], //n precisa u repo
})
export class UserModule {}
