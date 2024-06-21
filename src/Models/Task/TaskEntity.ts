import { UUID } from 'src/utils/UUID';

export class Task {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: string;
  ownerUser: string;
  createdAt: Date;
  completed:boolean;

  constructor(taskData: {
    id?: string;
    title: string;
    description?: string;
    duration?: number;
    type?: string;
    ownerUser: string;
    createdAt?: Date;
    completed?:boolean;
  }) {
    this.id = taskData.id ? taskData.id : UUID.randomUUID();
    this.title = taskData.title;
    this.description = taskData.description ? taskData.description : null;
    this.duration = taskData.duration ? taskData.duration : null;
    this.type = taskData.type ? taskData.type : 'default';
    this.ownerUser = taskData.ownerUser;
    this.createdAt = taskData.createdAt ? taskData.createdAt : new Date();
    this.completed= taskData.completed? taskData.completed : false;
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
        completed: taskData.completed==0? false : true
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
        completed: taskData.completed
    }
  }

}
