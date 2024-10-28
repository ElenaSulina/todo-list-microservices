import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './lists.entity';

@Module({
  providers: [ListsService],
  controllers: [ListsController],
  imports: [
    TypeOrmModule.forFeature([List]),
  ],
  exports: [ListsService]
})
export class ListsModule {}
