import {  Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AddRoleDto } from './dto/add-role.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}


    @MessagePattern("auth.addUser")
    create(@Payload() userDto: CreateUserDto) {
        return this.usersService.addUser(userDto);
    }


    @MessagePattern("auth.getUsers")
    listOfUsers() {
        return this.usersService.getUsers();
    }


    @MessagePattern("auth.getUserById")
    getUser(@Payload() id) {
        return this.usersService.getUserById(id);
    }


    @MessagePattern("auth.updateUser")
    updateUser(@Payload() data) {
        return this.usersService.updateUser(data.id, data.dto);
    }


    @MessagePattern("auth.addRole")
    addRole(@Payload() dto: AddRoleDto) {
        return this.usersService.addRole(dto)
    }


    @MessagePattern("auth.deleteUser") 
    async deleteUser(@Payload() id) {
        return this.usersService.deleteUser(id);
    }
}
