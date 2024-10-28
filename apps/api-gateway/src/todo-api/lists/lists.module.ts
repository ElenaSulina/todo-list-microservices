import { forwardRef, Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TodoApiModule } from '../todo-api.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [ListsService],
  controllers: [ListsController],
  imports: [
    forwardRef(() =>TodoApiModule),
    JwtModule
  ],
  exports: [ListsService]
})
export class ListsModule {}
