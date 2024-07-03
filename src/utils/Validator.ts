import { BadRequestException } from '@nestjs/common';

export class Validator {
  static validateInput(input: Input, requiredfields: RequiredFields) {
    if (requiredfields.requireLogged == true && !input.decodedToken)
      throw new BadRequestException('YOU MUST BE LOGGED IN TO ACESS THIS RESOURCE');
    for (var fieldName in requiredfields.fields) {
      const fields = requiredfields.fields;
      if (fields[fieldName].require == true) {
        if (
          input[fieldName] == null ||
          input[fieldName] == undefined ||
          input[fieldName] == ''
        )
          throw new BadRequestException(`FIELD '${fieldName}' IS REQUIRED`);
      }
    }
  }
}

type RequiredFields = {
  requireLogged: boolean;
  fields: {
    [fieldName: string]: {
      require: boolean;
    };
  };
};

type Input = {
  decodedToken?: {
    userId?: string;
    email: string;
  };
  [fields: string]: any;
};
