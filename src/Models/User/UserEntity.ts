import { UUID } from "../../utils/UUID";

export class User {
    id:string;
    name:string;
    email:string;
    password:string;
    phone:string | null;
    createdAt:Date;
    updatedAt:Date;
    authToken:string;
    constructor( userData:{
        id?:string | null,
        name:string,
        email:string,
        password:string,
        phone?:string | null,
        createdAt?:Date | null,
        updatedAt?:Date | null,
        authToken?:string | null
    }){
        this.id= userData.id? userData.id: UUID.randomUUID();
        this.name = userData.name;
        this.email = userData.email;
        this.password = userData.password;
        this.phone = userData.phone? userData.phone: null;
        this.createdAt = userData.createdAt? userData.createdAt: new Date();
        this.updatedAt = userData.updatedAt? userData.updatedAt: new Date();
        this.authToken = userData.authToken? userData.authToken: null
    }

    static fromDatabase(data:any):User{
        const newUser = new User ({
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            authToken: data.auth_token
        })
        return newUser;
    }

    static toDatabase(data:User){
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            created_at: data.createdAt,
            updated_at: data.updatedAt,
            auth_token: data.authToken
        }
    }
}