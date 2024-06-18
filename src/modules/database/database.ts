import { DataSource } from "typeorm";
import UserSchema from "./schemas/UserSchema";
import { TaskSchema } from "./schemas/TaskSchema";

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    UserSchema,
    TaskSchema
  ],
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
  legacySpatialSupport: false,
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
