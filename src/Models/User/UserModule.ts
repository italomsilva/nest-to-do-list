import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/UserController';
import { UserService } from 'src/services/UserService';
import { User } from './UserEntity';
import { JwtAuthModule } from 'src/middleware/JwtAuthModule';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtAuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
