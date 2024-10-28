import { Controller } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller('projects')
export class ProjectsController {
    constructor(private projectService: ProjectsService) {}


    @MessagePattern("todo.createProject")
    create(@Payload() data){
        return this.projectService.createProject(data.userId, data.dto);
    }


    @MessagePattern("todo.getAllProjects")
    listOfProjects(){
        return this.projectService.getAllProjects();
    }


    @MessagePattern("todo.getUsersProjects")
    listOfUsersProjects(@Payload() userId: number){
        return this.projectService.getUsersProjects(userId);
    }


    @MessagePattern("todo.getProjectById")
    open(@Payload() data) {
        return this.projectService.getProjectById(data.userId, data.id)
    }


    @MessagePattern("todo.updateProject") 
    updateProject(@Payload() data) {
        return this.projectService.updateProject(data.userId, data.id, data.dto);
    }


    @MessagePattern("todo.deleteProject") 
    deleteProject(@Payload() data) {
        return this.projectService.deleteProject(data.userId, data.id);
    }
}
