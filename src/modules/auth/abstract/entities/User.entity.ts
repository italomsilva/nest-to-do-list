import { UUID } from 'src/modules/common/UUID';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public phone?: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}


   static fromDatabase(data:any):User{
      return new User(data.id, data.name, data.email, data.password)
   }
   static createFromArray(dataArray:any[]):User[]{
      return dataArray.map((data)=> User.fromDatabase(data));
   }
   static create(data:any):User{
      let id=UUID.randomUUID();
      return new User(
         id,
         data.name,
         data.email,
         data.password,
         data.phone? data.phone : null
      );
   }
}