import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from '../Service/UserService';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get('find-all')
  async findAll() {
    const output = await this.userService.findAll();
    return output;
  }

  @Post('sign-up')
  async signUp(@Body() body: any) {
    const output = await this.userService.signUp(body);
    return output;
  }  

  @Post('sign-in')
  async signIn(@Body() body: any) {
    const output = await this.userService.signIn(body);
    return output;
  }  

  @Put('edit-user')
  async editUser(@Body() body: any) {
    const output = await this.userService.editUser(body);
    return output;
  }

  @Delete('delete-user')
  async deleteUser(@Body() body: any) {
    const output = await this.userService.deleteUser(body);
    return output;
  }
}
