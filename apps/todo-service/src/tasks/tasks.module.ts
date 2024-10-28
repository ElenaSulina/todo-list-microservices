import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { List } from '../lists/lists.entity';
import { ListsModule } from '../lists/lists.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    TypeOrmModule.forFeature([Task, List]),
    ListsModule
  ],
  exports: [TasksService]
})
export class TasksModule {}
