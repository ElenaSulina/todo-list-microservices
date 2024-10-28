import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { moveTaskDto } from './dto/move-task.dto';
import { List } from '../lists/lists.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(List)
        private listRepository: Repository<List>
    ) {}

    async createTask(dto: createTaskDto): Promise<Task> {

        const list = await this.listRepository.findOne({
            where: {id: Number(dto.list)},
        })


        if (!list) {
            throw new RpcException('Список задач не найден');
        }

        const task = this.taskRepository.create(dto);

        // Посчитать количество списков в проекте с данным id
        const count = await this.taskRepository.countBy({list: {id: Number(dto.list)}});

        // Присвоить новому списку порядковый номер (кол-во + 1)
        task.order = (count + 1);

        // Добавить список в проект, вернуть список
        await this.taskRepository.save(task);
        return task;   
    }


    async getTaskById(userId: number, id: number): Promise<Task> {
        const task = await this.taskRepository.findOne({relations: {list: true}, where: {id, list: {project: {user: userId}}}});
        
        if(!task) {
            throw new RpcException("Задача не найдена")
        }

        return task;
    }


    async updateTask(userId: number, id: number, dto: createTaskDto) {

        const task = await this.getTaskById(userId, id);

        if (task) {
            task.name = dto.name
            task.description = dto.description
            await this.taskRepository.update(id, dto);
        }
        
        return task;
    }


    async moveTask(userId: number, id: number, dto: moveTaskDto) {

        const task = await this.getTaskById(userId, id);
        let list: List;
        
        if (task) {

            // Если пользователь перемещает задачу в другой список задач
            if (dto.listId) {

                // Проверяем, что список, в который нужно переместить задачу принадлежит этому пользователю
                const list =  await this.listRepository.findOne({ where: { id: dto.listId }});

                if (!list) {

                    throw new RpcException("Нет доступа к списку задач")

                } else if (list.id !== task.list.id) {

                    const tasks = await this.taskRepository.find({where: {list: {id: task.list.id}}})

                    // Сдвигаем вниз на 1 позицию задачи, у которых порядковый номер был выше
                    for (let item of tasks) {
                        if (item.order > task.order) {
                            await this.taskRepository.decrement({id: item.id}, "order", 1)
                        }
                    }

                    // Обновляем данные Id списка в задаче
                    task.list = list;

                    // Присваеваем новый порядковый номер (в конце списка)
                    const count = await this.taskRepository.countBy({list});
                    console.log(count)
                    task.order = (count + 1);
                }    
            }

            // Если пользователь меняет порядковый номер задачи
            if (dto.order) {

                // Находим все задачи в данном списке
                const tasksInList: Task[] = await this.taskRepository.find({where: {list: {id: task.list.id}}});
    
                let currentOrder = task.order;
                const newOrder = dto.order;
                
                    // Если порядковый номер нужно уменьшить, 
                    if(currentOrder > newOrder) {
                        for (let item of tasksInList) {
                            if (item.order >= newOrder && item.order < currentOrder) {
    
                                // увеличить элементы между старым и новым порядковыми номерами
                                await this.taskRepository.increment({id: item.id}, "order", 1)
                            }  
                        }
                    }
    
                    // Если порядковый номер нужно увеличить
                    if(currentOrder < newOrder) {
                        for (let item of tasksInList) {
                            if (item.order <= newOrder && item.order > currentOrder) {
    
                                //уменьшить элементы между старым и новым порядковыми номерами
                                await this.taskRepository.decrement({id: item.id}, "order", 1)
                            }  
                        }
                    }
    
                    // После того, как сдвинули остальные элементы, присвоить новый порядковый номер
                    task.order = newOrder;
                }
            await this.taskRepository.save(task)
        }
        return task;
    }


    async deleteTask(userId: number, id: number) {
        const task = await this.getTaskById(userId, id)
        const tasks = await this.taskRepository.find({where: {list: {id: task.list.id}}})

        if (!task) {
            return task
        }

        if (tasks) {
            for (let item of tasks) {
                if (item.order > task.order) {
                    item.order -= 1;
                    await this.taskRepository.save(item);
                }
            }
        }
        
        await this.taskRepository.delete(id);
        return {message: "Задача удалена"}
    }
}
