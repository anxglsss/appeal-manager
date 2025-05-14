import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { AppealStatus } from '../utils/statuses';

@Entity()
export class Appeal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column()
  message: string;

  @Column({
    type: 'enum',
    enum: AppealStatus,
    default: AppealStatus.NEW,
  })
  status: AppealStatus;

  @Column({ nullable: true })
  resolutionText: string;

  @Column({ nullable: true })
  cancelReason: string;

  @CreateDateColumn()
  createdAt: Date;
}