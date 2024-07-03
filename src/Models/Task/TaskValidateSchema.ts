export const validateSchema = {
  findAll: {
    requireLogged: true,
    fields: {},
  },
  create: {
    requireLogged: true,
    fields: {
      title: {
        require: true,
      },
    },
  },
  edit: {
    requireLogged: true,
    fields: {
      taskId: {
        require: true,
      },
    },
  },
  changeCompleted: {
    requireLogged: true,
    fields: {
      taskId: {
        require: true,
      },
    },
  },
  delete: {
    requireLogged: true,
    fields: {
      taskId: {
        require: true,
      },
    },
  },
};
