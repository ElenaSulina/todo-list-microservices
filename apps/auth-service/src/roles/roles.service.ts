import { Injectable } from '@nestjs/common';
import { createRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
    ) {}

    async createRole(dto: createRoleDto){
        const role = this.roleRepository.create(dto);
        await this.roleRepository.save(role);
        return role;
    }

    async getRoleByValue(value: string){
        const role = await this.roleRepository.findOne({where: {value}});
        return role;
    }

    async deleteRole(id: number)
    {
        
        return this.roleRepository.delete(id);
    }
}
