import { Injectable, NotFoundException } from '@nestjs/common';
import { createListDto } from './dto/create-list.dto';
import { List } from './lists.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { moveListDto } from './dto/move-list.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ListsService {
    constructor(
        @InjectRepository(List)
        private listRepository: Repository<List>,
    ) {}


    async createList(dto: createListDto) {
        const list = this.listRepository.create(dto);

        // Посчитать количество списков в проекте с данным id
        const count = await this.listRepository.countBy({project: {id: Number(dto.project)}});

        // Присвоить новому списку порядковый номер (кол-во + 1)
        list.order = (count + 1);

        // Добавить список в проект, вернуть список
        await this.listRepository.save(list);
        return list;   
    }


    async getListById(userId: number, id: number): Promise<List> {
        const list = await this.listRepository.findOne({relations: {tasks: true}, where: {id, project: {user: userId}}, order: {tasks: {order: "ASC"}},});
        if (!list) {
            throw new RpcException("Список задач не найден")
        }
        return list;
    }


    async updateList(userId: number, id: number, dto: createListDto) {
        const list = await this.getListById(userId, id);
        if (list) {
            list.name = dto.name;
            await this.listRepository.update({id}, dto);
        }
        return list;
    }


    async moveList(userId: number, id: number, dto: moveListDto) {

        const list: List = await this.getListById(userId, id);

        if(list) {

            const listsInProject: List[] = await this.listRepository.find({where: {project: list.project}});

            let currentOrder = list.order;
            const newOrder = dto.order;
            
            // Если порядковый номер нужно уменьшить, 
            if(currentOrder > newOrder) {
                for (let item of listsInProject) {
                    if (item.order >= newOrder && item.order < currentOrder) {

                        // увеличить элементы между старым и новым порядковыми номерами
                        await this.listRepository.increment({id: item.id}, "order", 1)
                    }  
                }
            }


            // Если порядковый номер нужно увеличить
            if(currentOrder < newOrder) {
                for (let item of listsInProject) {
                    if (item.order <= newOrder && item.order > currentOrder) {

                        //уменьшить элементы между старым и новым порядковыми номерами
                        await this.listRepository.decrement({id: item.id}, "order", 1)
                    }  
                }
            }

            // После того, как сдвинули остальные элементы, присвоить новый порядковый номер
            list.order = newOrder;
            
            await this.listRepository.save(list)
        }
        return list;
    }

    
    async deleteList(userId: number, id: number) {
        const list = await this.getListById(userId, id);
        const lists = await this.listRepository.find({where: {project: list.project}})

        if (!list) {
            return list
        }

        if (lists) {
            for (let item of lists) {
                if (item.order > list.order) {
                    item.order -= 1;
                    await this.listRepository.save(item);
                }
            }     
        }

        await this.listRepository.delete(id);
        return {message: "Список задач удален"};
    }
}