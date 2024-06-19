import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/Controllers/UserController';
import { UserService } from 'src/Service/UserService';
import { UserRepository } from './UserRepository';
import { UserSchema } from './UserSchema';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [UserService, UserRepository], //n precisa u repo
})
export class UserModule {}
