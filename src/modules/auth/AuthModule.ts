import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/AuthController';
import { FindAllUsersService } from 'src/services/auth/FindAllUsersService';
import {
  findAllUsersService,
  signUpService,
} from '../common/DependenciesInjection';
import { SignUpService } from 'src/services/auth/SIgnUpService';

@Module({
  providers: [
    {
      provide: FindAllUsersService,
      useValue: findAllUsersService,
    },
    {
      provide: SignUpService,
      useValue: signUpService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
