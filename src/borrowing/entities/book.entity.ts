import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  BORROWED = 'BORROWED',
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ type: 'enum', enum: BookStatus })
  status: BookStatus;
} 