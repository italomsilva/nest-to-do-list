export class Task {
    id: string;
    name: string;
    description: string;
    duration: number;
    type: string;
    ownerUser: string;
    createdAt: Date;

    constructor(taskData:{
        id: string,
        name: string,
        description: string,
        duration: number,
        type: string,
        ownerUser: string,
        createdAt: Date,
    }){
        this.id=taskData.id;
        this.name=taskData.name;
        this.description=taskData.description;
        this.duration=taskData.duration;
        this.type=taskData.type;
        this.ownerUser=taskData.ownerUser;
        this.createdAt=taskData.createdAt;
    }

    static fromDatabase(data:any):Task{
        return new Task({
            id: data.id,
            description: data.description,
            name: data.name,
            createdAt: data.created_at,
            duration:data.duration,
            ownerUser: data.owner_user,
            type:data.type
        });
    }

    static createFromArray(dataArray:any[]):Task[]{
        const tasks = dataArray.map((data) => Task.fromDatabase(data))
        return tasks;
    }

}
