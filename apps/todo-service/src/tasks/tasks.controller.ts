import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}


    @MessagePattern("todo.createTask")
    create(@Payload() dto: createTaskDto){
        return this.tasksService.createTask(dto);
    }


    @MessagePattern("todo.getTaskById")
    open(@Payload() data) {
        return this.tasksService.getTaskById(data.userId, data.id)
    }


    @MessagePattern("todo.updateTask")
    updateTask(@Payload() data) {
        return this.tasksService.updateTask(data.userId, data.id, data.dto);
    }


    @MessagePattern("todo.moveTask")
    move(@Payload() data){
        return this.tasksService.moveTask(data.userId, data.id, data.dto);
    }


    @MessagePattern("todo.deleteTask")
    deleteTask(@Payload() data) {
        return this.tasksService.deleteTask(data.userId, data.id);
    }
}
