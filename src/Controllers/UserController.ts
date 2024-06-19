import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../Service/UserService';
import { UserSchema } from '../Models/User/UserSchema';
import { User } from 'src/Models/User/UserEntity';

@Controller('/u')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserSchema> {
    return this.userService.findById(id);
  }

  @Post('sign-up')
  async signUp(@Body() body:any):Promise<User> {
    return this.userService.signUp(body);
  }

  @Post('sign-in')
  async (@Body() body:any):Promise<User> {
    return this.userService.singIn(body);
  }

  @Post('find-all')
  async findAll():Promise<User[]>{
    return await this.userService.findAll();
  }
}
