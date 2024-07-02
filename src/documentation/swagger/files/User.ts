export const userRequest = {
  '/user/find-all': {
    get: {
      summary: 'Listar Usuários',
      description:
        'Recurso que retorna uma lista de todos os usuários cadastrados no sistema.',
      tags: ['User'],
      responses: {
        200: {
          description: 'Successful operation',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  '/user/sign-up': {
    post: {
      summary: 'Cadastrar usuário',
      description: 'Recurso que permite cadastrar um novo usuário no sistema',
      tags: ['User'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/signUpRequest',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Successful operation',
        },
        409: {
          description: 'Email already in use',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  '/user/sign-in': {
    post: {
      summary: 'Autenticar Usuário',
      description: 'Recurso que permite autenticar um usuário no sistema.',
      tags: ['User'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/signInRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successful operation',
        },
        401: {
          description: 'Unauthorized',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  '/user/edit-user': {
    put: {
      summary: 'Atualizar usuário',
      description: 'Recurso que permite alterar dados do usuário.',
      tags: ['User'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/editUserRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successful operation',
        },
        400: {
          description: 'Bad request',
        },
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'User not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  '/user/delete-user': {
    delete: {
      summary: 'Deletar Usuário',
      description:
        'Recurso que permite deletar o cadastro no sistema.',
      tags: ['User'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/deleteUserRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successful operation',
        },
        401: {
          description: 'Unauthorized',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
};

export const userSchema = {
  signUpRequest: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Fernando Junior da Silva',
      },
      email: {
        type: 'string',
        example: 'fernandojr.123@example.com',
      },
      password: {
        type: 'string',
        example: 'minhasenha123',
      },
      phone: {
        type: 'string',
        example: '85987654321',
      },
    },
    required: ['name', 'email', 'password'],
  },
  signInRequest: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: 'fernandojr.123@example.com',
      },
      password: {
        type: 'string',
        example: 'minhasenha123',
      },
    },
    required: ['email', 'password'],
  },
  editUserRequest: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Julio Cesar da Silva',
      },
      phone: {
        type: 'string',
        example: '85912345678',
      },
      newPassword: {
        type: 'string',
        example: 'minhanovasenha123',
      },
      currentPassword: {
        type: 'string',
        example: 'minhasenhaatual123',
      },
    },
  },
  deleteUserRequest: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: 'fernandojr.123@example.com',
      },
      password: {
        type: 'string',
        example: 'minhasenha123',
      },
    },
    required: ['email', 'password'],
  },
};
