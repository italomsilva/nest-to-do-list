import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerThemeNameEnum, SwaggerTheme } from 'swagger-themes';
import { swaggerDocument } from './central';

export class SwaggerConfig {
  static setup(app: INestApplication) {
    const theme = new SwaggerTheme();

    const options = {
      explorer: false,
      customCss: theme.getBuffer(SwaggerThemeNameEnum.CLASSIC),
    };

    SwaggerModule.setup('documentation/swagger', app, swaggerDocument, options);
  }
}
