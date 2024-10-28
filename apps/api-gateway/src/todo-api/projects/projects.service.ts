import { Inject, Injectable } from '@nestjs/common';
import { createProjectDto } from './dto/create-project.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProjectsService {
    constructor(
        @Inject("TODO_SERVICE") private todoClient: ClientProxy
    ) {}


    async createProject(userId: number, dto: createProjectDto) {
        return this.todoClient.send("todo.createProject", {dto, userId})
    }


    async getAllProjects() {
        return this.todoClient.send("todo.getAllProjects", {});
    }


    async getUsersProjects(userId: number){
        return this.todoClient.send("todo.getUsersProjects", userId);
    }


    async getProjectById(userId: number, id: number) {
        
        return this.todoClient.send("todo.getProjectById", {userId, id});
    }


    async updateProject(userId: number, id: number, dto: createProjectDto) {
        return this.todoClient.send("todo.updateProject", {userId, id, dto});
    }

    
    async deleteProject(userId: number, id: number) {
        return this.todoClient.send("todo.deleteProject", {userId, id});
    }
}
