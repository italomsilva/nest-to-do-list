import { UUID } from 'src/utils/UUID';

export class Task {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: string;
  ownerUser: string;
  createdAt: Date;

  constructor(taskData: {
    id?: string;
    title: string;
    description?: string;
    duration?: number;
    type?: string;
    ownerUser: string;
    createdAt?: Date;
  }) {
    this.id = taskData.id ? taskData.id : UUID.randomUUID();
    this.title = taskData.title;
    this.description = taskData.description ? taskData.description : null;
    this.duration = taskData.duration ? taskData.duration : null;
    this.type = taskData.type ? taskData.type : 'default';
    this.ownerUser = taskData.ownerUser;
    this.createdAt = taskData.createdAt ? taskData.createdAt : new Date();
  }

  static fromDatabase(taskData:any):Task{
    return new Task({
        id: taskData.id,
        title: taskData.title,
        description: taskData.description,
        duration: taskData.duration,
        type: taskData.type,
        ownerUser: taskData.owner_user,
        createdAt: taskData.created_at,
    });
  }

  static toDatabase(taskData:Task):any{
    return {
        id: taskData.id,
        title: taskData.title,
        description: taskData.description,
        duration: taskData.duration,
        type: taskData.type,
        owner_user: taskData.ownerUser,
        created_at: taskData.createdAt,
    }
  }
}
