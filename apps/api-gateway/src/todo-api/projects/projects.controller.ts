import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { createProjectDto } from './dto/create-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/guards/jwt-auth.guard';
import { Roles } from '@app/guards/role-auth.decorator';
import { RolesGuard } from '@app/guards/roles.guard';

@ApiTags("Проекты")
@Controller('projects')
export class ProjectsController {
    constructor(private projectService: ProjectsService) {}

    @ApiOperation({ summary: 'Создание проекта' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() req, @Body() dto: createProjectDto){
        return this.projectService.createProject(req.user.id, dto);
    }


    @ApiOperation({ summary: 'Получение списка всех проектов' })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get('/all')
    listOfProjects(){
        return this.projectService.getAllProjects();
    }


    @ApiOperation({ summary: 'Получение проектов пользователя' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Get()
    listOfUsersProjects(@Req() req){
        return this.projectService.getUsersProjects(req.user.id);
    }


    @ApiOperation({ summary: 'Получение проекта по id' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    open(@Req() req, @Param("id") id: number) {
        return this.projectService.getProjectById(req.user.id, id)
    }


    @ApiOperation({ summary: 'Изменение проекта' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Put("/:id") 
    updateProject(@Req() req, @Param("id") id: number, @Body() dto: createProjectDto) {
        return this.projectService.updateProject(req.user.id, id, dto);
    }


    @ApiOperation({ summary: 'Удаление проекта' })
    @ApiResponse({ status: 204 })
    @UseGuards(JwtAuthGuard)
    @Delete("/:id") 
    deleteProject(@Req() req, @Param("id") id: number) {
        return this.projectService.deleteProject(req.user.id, id);
    }
}
