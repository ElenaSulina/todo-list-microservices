import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddRoleDto } from './dto/add-role.dto';
import { JwtAuthGuard } from '@app/guards/jwt-auth.guard';
import { Roles } from '@app/guards/role-auth.decorator';
import { RolesGuard } from '@app/guards/roles.guard';


@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}


    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.addUser(userDto);
    }


    @ApiOperation({ summary: 'Получение списка пользователей' })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get() 
    listOfUsers() {
        return this.usersService.getUsers();
    }


    @ApiOperation({ summary: 'Получение пользователя' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Get("/:id") 
    getUser(@Param("id") id: number) {
        return this.usersService.getUserById(id);
    }


    @ApiOperation({ summary: 'Изменение пользователя' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Put("/:id") 
    updateUser(@Param("id") id: number, @Body() dto: CreateUserDto) {
        return this.usersService.updateUser(id, dto);
    }


    @ApiOperation({ summary: 'Присвоение ролей пользователю (доступ: ADMIN)' })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/role") 
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }


    @ApiOperation({ summary: 'Удаление пользователя' })
    @ApiResponse({ status: 204 })
    @UseGuards(JwtAuthGuard)
    @Delete("/:id") 
    deleteUser(@Param("id") id: number) {
        return this.usersService.deleteUser(id);
    }
}
