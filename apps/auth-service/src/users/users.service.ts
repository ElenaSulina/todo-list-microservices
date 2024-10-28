import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import * as bcrypt from "bcryptjs"
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private roleService: RolesService
    ) {}


    async addUser(dto: CreateUserDto) {
        const user = this.usersRepository.create(dto);
        const hashedPassword = await bcrypt.hash(dto.password, 5);
        let role = await this.roleService.getRoleByValue("USER");
        if (!role) {
            role = await this.roleService.createRole({value: "USER", description: "Пользователь"})
        }
        user.roles = [role];
        user.password = hashedPassword;
        await this.usersRepository.save(user);
        return user;
    }


    async getUserById(id: number) {
        const user = await this.usersRepository.findOne({where: {id}, relations:{roles: true}});
        return user;
    }


    async getUsers(): Promise<User[]> {
        const users = await this.usersRepository.find({relations:{roles: true}});
        return users;
    }


    async updateUser(id: number, dto: CreateUserDto) {
        await this.usersRepository.update(id, dto);
        return this.getUserById(id);
    }


    async deleteUser(id: number) {
        await this.usersRepository.delete(id);
        return {message: "Пользователь удален"}
    }


    async getUserByEmail(email: string){
        const user = await this.usersRepository.findOne({where: {email}, relations:{roles: true}});
        return user;
    }


    async addRole(dto: AddRoleDto) {

        const user = await this.usersRepository.findOne({where: {id: dto.userId}, relations:{roles: true}});
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            user.roles.push(role);
            await this.usersRepository.save(user);
            return user;
        }

        throw new RpcException("Пользователь или роль не найдены")
    }
}
