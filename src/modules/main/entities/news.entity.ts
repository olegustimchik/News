import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 250, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 250 })
  description: string;

  @Column({ type: "boolean", default: false })
  isPublished: boolean;

  @Column({ type: "timestamp", nullable: true, default: null })
  publishedAt: string;

  @CreateDateColumn()
  createdAt: string;
}

