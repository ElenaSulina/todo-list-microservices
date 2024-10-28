import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../projects/projects.entity';
import { Task } from '../tasks/tasks.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('lists')
export class List {
  
  @ApiProperty({ example: 1,  description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1,  description: 'Порядковый номер списка задач в проекте'})
  @Column()
  order: number;

  @ApiProperty({ example: 'Выполнить',  description: 'Название списка задач'})
  @Column({default: "Новый список"})
  name: string;

  @ManyToOne(() => Project, (project) => project.lists, {onDelete: "CASCADE"})
  project: Project

  @OneToMany(() => Task, (task) => task.list, {cascade: true})
  tasks: Task[];
}