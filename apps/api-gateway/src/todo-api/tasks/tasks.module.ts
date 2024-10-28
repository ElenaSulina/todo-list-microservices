import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ListsModule } from '../lists/lists.module';
import { TodoApiModule } from '../todo-api.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    forwardRef(() =>TodoApiModule),
    ListsModule,
    JwtModule
  ],
  exports: [TasksService]
})
export class TasksModule {}
