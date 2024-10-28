import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { Repository } from 'typeorm';
import { createProjectDto } from './dto/create-project.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>
    ) {}


    async createProject(userId, dto: createProjectDto) {
        const project = this.projectRepository.create(dto);
        project.user = userId;
        await this.projectRepository.save(project);
        return project;
    }


    async getAllProjects(): Promise<Project[]> {
        const projects = await this.projectRepository.find({relations: {lists: {tasks: true}}, order: {id: "ASC"}});
        return projects;
    }


    async getUsersProjects(userId): Promise<Project[]>{
        const projects = await this.projectRepository.find({ 
            relations: { lists: {tasks: true}},
            where: {user: userId},
            order: {
                id: "ASC",
                lists: {order: "ASC", tasks: {order: "ASC"}}
            }});
        return projects;
    }


    async getProjectById(userId: number, id: number): Promise<Project> {
        const project = await this.projectRepository.findOne({relations: { lists: {tasks: true}}, where: {id, user: userId}, order: {lists: {order: "ASC", tasks: {order: "ASC"}}}});
        
        if(!project) {
            throw new RpcException("Проект не найден")
        }
        
        return project;
    }


    async updateProject(userId: number, id: number, dto: createProjectDto) {
        await this.projectRepository.update({id, user: userId}, dto);
        return this.getProjectById(userId, id);
    }

    
    async deleteProject(userId: number, id: number) {

        const project = this.getProjectById(userId, id)
        
        if (!project) {
            return project
        }
        
        await this.projectRepository.delete({id});
        return { message: 'Проект удален' }
    }
}
