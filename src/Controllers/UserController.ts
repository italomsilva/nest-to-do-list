import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { UserService } from '../Service/UserService';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const output = await this.userService.signUp(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (err) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: err.message });
    }
  }

  @Post('sign-in')
  async signIn(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const output = await this.userService.signIn(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (err) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: err.message });
    }
  }

  @Post('find-all')
  async findAll(@Res() response: Response): Promise<Response> {
    try {
      const output = await this.userService.findAll();
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (err) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: err.message });
    }
  }

  @Post('edit-user')
  async editUser(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const output = await this.userService.editUser(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (err) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: err.message });
    }
  }

  @Post('delete-user')
  async deleteUser(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const output = await this.userService.deleteUser(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (err) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: err.message });
    }

  }
}
