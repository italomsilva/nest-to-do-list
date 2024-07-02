import { OpenAPIObject } from '@nestjs/swagger';
import { security, securitySchema } from './files/Security';
import { requestUser, userSchemes } from './files/User';

const swaggerDocument: OpenAPIObject = {
  openapi: '3.0.0',
  info: {
    title: 'Sistema de Lista de tarefas',
    description: 'Este documento fornece uma visão detalhada do sistema de Lista de Tarefas, focando nas requisições e no conteúdo necessário para o corpo das solicitações. A aplicação de Lista de Tarefas permite aos usuários criar, visualizar, atualizar e excluir tarefas de maneira eficiente. A documentação a seguir especifica os endpoints disponíveis, os métodos HTTP suportados e os formatos de dados esperados no corpo das requisições. Além disso, detalha a necessidade de uma chave de acesso e de um token JWT para autenticação, garantindo que os usuários possam interagir com a API de forma correta e segura.',
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
    ...requestUser,
  },
  components: {
    schemas: {
      ...userSchemes,
    },
    securitySchemes: securitySchema,
  },
};

export { swaggerDocument };
