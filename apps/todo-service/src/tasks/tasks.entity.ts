import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { List } from '../lists/lists.entity';

@Entity('tasks')
export class Task {
  
  @ApiProperty({ example: 1,  description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1,  description: 'Порядковый номер задачи в списке задач'})
  @Column()
  order: number;

  @ApiProperty({ example: 'Сделать tasks',  description: 'Название задачи'})
  @Column({default: "Новая задача"})
  name: string;

  @ApiProperty({ 
    example: '1. Название 2. Описание 3. Дата и время создания 4.Создание, удаление, изменение. 5. Перетаскивание',  
    description: 'Описание задачи'})
  @Column({ nullable: true})
  description: string;

  @ApiProperty({ example: '2024-01-01 01:01:00',  description: 'Дата и время создания'})
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => List, (list) => list.tasks, {onDelete: "CASCADE"})
  list: List
}