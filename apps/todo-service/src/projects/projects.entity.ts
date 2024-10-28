import { ApiProperty } from '@nestjs/swagger';
import { List } from '../lists/lists.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('projects')
export class Project {
  
  @ApiProperty({ example: 1,  description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Мои дела',  description: 'Название проекта'})
  @Column({ nullable: true})
  name: string;

  @ApiProperty({ example: 'Список моих дел',  description: 'Описание проекта'})
  @Column({ nullable: true})
  description: string;

  @ApiProperty({ example: '2024-01-01 01:01:00',  description: 'Дата и время создания'})
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({ example: '1',  description: 'Id пользователя'})
  @Column()
  user: number

  @OneToMany(() => List, (list) => list.project, {cascade: true})
  lists: List[];
}