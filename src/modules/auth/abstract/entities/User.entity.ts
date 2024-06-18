import { UUID } from 'src/modules/common/UUID';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(userData: {
    id: string | null;
    name: string;
    email: string;
    password: string;
    phone: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    (this.id = userData.id ? userData.id : UUID.randomUUID()),
      (this.name = userData.name),
      (this.email = userData.email),
      (this.password = userData.password),
      (this.phone = userData.phone ? userData.phone : null),
      (this.createdAt = userData.createdAt ? userData.createdAt : new Date()),
      (this.updatedAt = userData.updatedAt ? userData.updatedAt : new Date());
  }

  static fromDatabase(data: any): User {
    return new User({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    });
  }

  static toDatabase(data: User): any {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      created_at: data.createdAt,
      updated_at: data.updatedAt,
    };
  }

  static createFromArray(dataArray: any[]): User[] {
    return dataArray.map((data) => User.fromDatabase(data));
  }

  static create(data: {
    id?: string | null;
    name: string;
    email: string;
    password: string;
    phone?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
  }): User {
    let id = UUID.randomUUID();
    return new User({
      id: id,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone ? data.phone : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
