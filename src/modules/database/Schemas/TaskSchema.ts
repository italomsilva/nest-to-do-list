import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity('tasks') 
export class TaskSchema {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text'})
    description: string;

    @Column({ type: 'int' })
    duration: number;

    @Column({ type: 'varchar', length: 50 })
    type: string;

    @Column({ type: 'varchar', length: 50})
    owner_user: string;

    @CreateDateColumn({ type: 'timestamp'})
    created_at: Date;
}
