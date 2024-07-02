import { OpenAPIObject } from '@nestjs/swagger';
import { security, securitySchema } from './files/Security';
import { userRequest, userSchema } from './files/User';

const swaggerDocument: OpenAPIObject = {
  openapi: '3.0.0',
  info: {
    title: 'Sistema de Lista de tarefas',
    description: 'A documentação a seguir especifica os endpoints disponíveis, os métodos HTTP suportados e os formatos de dados esperados no corpo das requisições. Para a completa utilização do sistema, são necessários dois cabeçalhos: uma chave de autorização, que deve ser enviada em todas as requisições, e um token JWT, necessário nas rotas que requerem autenticação do usuário. Essas medidas garantem que os usuários possam interagir com a API de forma correta e segura.',
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://localhost:${process.env.APP_PORT}`,
      description: 'API server',
    },
  ],
  security,
  paths: {
    ...userRequest,
  },
  components: {
    schemas: {
      ...userSchema,
    },
    securitySchemes: securitySchema,
  },
};

export { swaggerDocument };
