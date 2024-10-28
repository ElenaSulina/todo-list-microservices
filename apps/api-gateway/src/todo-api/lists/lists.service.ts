import { Inject, Injectable} from '@nestjs/common';
import { createListDto } from './dto/create-list.dto';
import { moveListDto } from './dto/move-list.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ListsService {
    constructor(
        @Inject("TODO_SERVICE") private todoClient: ClientProxy
    ) {}


    async createList(dto: createListDto) {
        return this.todoClient.send("todo.createList", dto)
    }


    async getListById(userId: number, id: number) {
        return this.todoClient.send("todo.getListById", {userId, id})
    }


    async updateList(userId: number, id: number, dto: createListDto) {
        return this.todoClient.send("todo.updateList", {userId, id, dto})
    }


    async moveList(userId: number, id: number, dto: moveListDto) {
        return this.todoClient.send("todo.moveList", {userId, id, dto})
    }

    
    async deleteList(userId: number, id: number) {
        return this.todoClient.send("todo.deleteList", {userId, id})
    }
}