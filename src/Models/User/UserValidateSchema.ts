export const validateSchema = {
  signUp: {
    requireLogged: false,
    fields: {
      name: {
        require: true,
      },
      email: {
        require: true,
      },
      password: {
        require: true,
      },
    },
  },
  signIn: {
    requireLogged: false,
    fields: {
      email: {
        require: true,
      },
      password: {
        require: true,
      },
    },
  },
  edit: {
    requireLogged: true,
    fields: {},
  },
  delete: {
    requireLogged: true,
    fields: {
      email: {
        require: true,
      },
      password: {
        require: true,
      },
    },
  },

};
