export const taskRequest = {
  '/task/find-all': {
    get: {
      summary: 'Listar Tarefas',
      description: 'Recurso que retorna uma lista de todas tarefas do usuário.',
      tags: ['Task'],
      requestBody: {
        required: false,
        content: {
          'application/json': {},
        },
      },
      responses: {
        200: {
          description: 'Successful operation', //todo: olhar se retorna create
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  '/task/create': {
    post: {
      summary: 'Criar tarefa',
      description: 'Recurso que realiza a criação de uma tarefa',
      tags: ['Task'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/createTaskRequest',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Successful operation', //todo: verificar codigo
        },
        400: {
          description: 'Bad Request',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  '/task/edit': {
    put: {
      summary: 'Editar tarefa',
      description: 'Recurso que permite a edição de uma tarefa.',
      tags: ['Task'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/editTaskRequest',
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
        404: {
          description: 'Not Found',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  '/task/toggle-completed': {
    patch: {
      summary: 'tarefa concluída x não concluída',
      description:
        'Recurso que permite alterar o estado da tarefa entre concluída e não concluída.',
      tags: ['Task'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/toggleCompletedTaskRequest',
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
        404: {
          description: 'Not Found',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  '/task/delete': {
    delete: {
      summary: 'Excluir tarefa',
      description: 'Recurso que permite deletar uma tarefa.',
      tags: ['Task'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/deleteTaskRequest',
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
        404: {
          description: 'Not Found',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
};

export const taskSchema = {
  createTaskRequest: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        example: 'Minha tarefa',
      },
      description: {
        type: 'string',
        example: 'Realizar a minha tarefa utilizando ferramentas.',
      },
      type: {
        type: 'string',
        example: 'job',
      },
      duration: {
        type: 'integer',
        example: 60,
      },
    },
    required: ['title'],
  },
  editTaskRequest: {
    type: 'object',
    properties: {
      taskId: {
        type: 'string',
        example: 'task1',
      },
      title: {
        type: 'string',
        example: 'Minha tarefa',
      },
      description: {
        type: 'string',
        example: 'Realizar a minha tarefa utilizando ferramentas.',
      },
      type: {
        type: 'string',
        example: 'job',
      },
      duration: {
        type: 'integer',
        example: 60,
      },
    },
    required: ['taskId'],
  },
  toggleCompletedTaskRequest: {
    type: 'object',
    properties: {
      taskId: {
        type: 'string',
        example: 'task1',
      },
    },
    required: ['taskId'],
  },
  deleteTaskRequest: {
    type: 'object',
    properties: {
      taskId: {
        type: 'string',
        example: 'task1',
      },
    },
    required: ['taskId'],
  },
};
