import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/Controllers/UserController';
import { UserService } from 'src/Service/UserService';
import { UserRepository } from './UserRepository';
import { UserSchema } from './UserSchema';
import { JwtAuthModule } from 'src/middleware/JwtAuthModule';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema]), JwtAuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
