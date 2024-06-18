import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity('tasks') 
export class TaskSchema {
    @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string;

    @Column({ type: 'int', nullable: false })
    duration: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    type: string;

    @Column({ name: 'owner_user', type: 'varchar', length: 255, nullable: false})
    ownerUser: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
    createdAt: Date;
}
