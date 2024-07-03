import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './appModule';
import { SwaggerConfig } from './documentation/swagger/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerConfig.setup(app);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
