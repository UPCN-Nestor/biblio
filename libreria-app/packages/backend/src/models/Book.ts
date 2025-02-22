import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column({ unique: true })
  isbn!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'cover_image', nullable: true })
  coverImage?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column()
  stock!: number;

  @Column({ name: 'ai_summary', type: 'text', nullable: true })
  aiSummary?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
} 