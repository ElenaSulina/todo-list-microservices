import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {

    constructor(
        @Inject("AUTH_SERVICE") private authClient: ClientProxy
    ) {}


    async addUser(dto: CreateUserDto) {
    return this.authClient.send("auth.addUser", dto)
    }


    async getUserById(id: number) {
        return this.authClient.send("auth.getUserById", id)
    }


    async getUsers() {
        return this.authClient.send("auth.getUsers", {})
    }


    async updateUser(id: number, dto: CreateUserDto) {
        return this.authClient.send("auth.updateUser", {id, dto})
    }


    async deleteUser(id: number) {
        return this.authClient.send("auth.deleteUser", id)
    }


    async getUserByEmail(email: string){
        return this.authClient.send("auth.getUserByEmail", email)
    }


    async addRole(dto: AddRoleDto) {
        return this.authClient.send("auth.addRole", dto)
    }
}
