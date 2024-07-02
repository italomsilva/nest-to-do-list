import { SecuritySchemeObject, ReferenceObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const security = [
  {
    apiKey: [],
    authToken: [],
  },
];

export const securitySchema: Record<string, SecuritySchemeObject | ReferenceObject> =
  {
    apiKey: {
      type: 'apiKey',
      in: 'header',
      name: 'to-do-apikey',

      description: 'Chave de Api para autorização de uso',
    },
    authToken: {
      type: 'apiKey',
      in: 'header',
      name: 'auth-token',
      description: 'Token de acesso para autenticação de usuário',
    },
  };