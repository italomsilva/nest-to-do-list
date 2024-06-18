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

    @Column({ type: 'varchar', length: 255, nullable: false})
    owner_user: string;

    @CreateDateColumn({ type: 'timestamp'})
    created_at: Date;
}
