import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskSchema {
  @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  duration: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  type: string;

  @Column({ name: 'owner_user', type: 'varchar', length: 255, nullable: false })
  ownerUser: string;

  @CreateDateColumn({ name: "created_at", type: 'timestamp' })
  createdAt: Date;
}
