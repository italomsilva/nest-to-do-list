import { User } from 'src/modules/auth/abstract/entities/User.entity';
import { EntitySchema } from 'typeorm';

const UserSchema = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      length: 255,
    },
    email: {
      type: 'varchar',
      length: 255,
      nullable: false,
      unique: true,
    },
    name: {
      name: 'name',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    phone: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    createdAt: {
      name: 'created_at',
      type: 'datetime',
      createDate: true,
      nullable: false,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'datetime',
      updateDate: true,
      nullable: false,
    },
    password: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
  },
});

export default UserSchema;
