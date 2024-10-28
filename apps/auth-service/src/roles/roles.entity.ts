import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('roles')
export class Role {
  
  @ApiProperty({ example: 1,  description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'ADMIN',  description: 'Значение роли пользователя'})
  @Column({ unique: true })
  value: string;

  @ApiProperty({ example: 'Администратор',  description: 'Описание роли на русском языке'})
  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.roles, {onDelete: "CASCADE"})
  users: User[];
}