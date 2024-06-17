import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { FindAllUsersService } from 'src/services/auth/FindAllUsersService';
import { Response } from 'express';
import { SignUpService } from 'src/services/auth/SIgnUpService';

@Controller('user')
export class AuthController {
  constructor(
    private readonly findAllUsersService: FindAllUsersService,
    private readonly signUpService: SignUpService,
  ) {}

  @Get('find-all')
  async findAllUsers(@Res() response: Response): Promise<Response> {
    try {
      const output = await this.findAllUsersService.execute();
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }
  @Post('sign-up')
  async signUpUsers(@Body() body, @Res() response): Promise<Response> {
    try {
      const output = await this.signUpService.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }
}
