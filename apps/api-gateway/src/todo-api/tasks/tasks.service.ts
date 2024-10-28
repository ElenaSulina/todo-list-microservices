import { Inject, Injectable } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { moveTaskDto } from './dto/move-task.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TasksService {
    constructor(
        @Inject("TODO_SERVICE") private todoClient: ClientProxy
    ) {}


    async createTask(dto: createTaskDto) {
        return this.todoClient.send("todo.createTask", dto)
    }


    async getTaskById(userId: number, id: number) {
        return this.todoClient.send("todo.getTaskById", {userId, id});
    }


    async updateTask(userId: number, id: number, dto: createTaskDto) {
        return this.todoClient.send("todo.updateTask", {userId, id, dto});
    }


    async moveTask(userId: number, id: number, dto: moveTaskDto) {
        return this.todoClient.send("todo.moveTask", {userId, id, dto});
    }


    async deleteTask(userId: number, id: number) {
        return this.todoClient.send("todo.deleteTask", {userId, id});
    }
} 
