import { Controller } from '@nestjs/common';
import { ListsService } from './lists.service';
import { createListDto } from './dto/create-list.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('lists')
export class ListsController {
    constructor(private listsService: ListsService) {}


    @MessagePattern("todo.createList")
    create(@Payload() dto: createListDto){
        return this.listsService.createList(dto);
    }


    @MessagePattern("todo.getListById")
    open(@Payload() data) {
        return this.listsService.getListById(data.userId, data.id)
    }


    @MessagePattern("todo.updateList")
    updateList(@Payload() data) {
        return this.listsService.updateList(data.userId, data.id, data.dto);
    }


    @MessagePattern("todo.moveList")
    move(@Payload() data){
        return this.listsService.moveList(data.userId, data.id, data.dto);
    }

    @MessagePattern("todo.deleteList")
    deleteList(@Payload() data) {
        return this.listsService.deleteList(data.userId, data.id);
    }
}
