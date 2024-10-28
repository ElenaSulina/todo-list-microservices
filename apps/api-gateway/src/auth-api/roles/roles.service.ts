import { Inject, Injectable } from '@nestjs/common';
import { createRoleDto } from './dto/create-role.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RolesService {

    constructor(
        @Inject("AUTH_SERVICE") private authClient: ClientProxy
    ) {}

    async createRole(dto: createRoleDto){
        return this.authClient.send("auth.createRole", dto)
    }

    async getRoleByValue(value: string){
        return this.authClient.send("auth.getRoleByValue", value)
    }

    async deleteRole(id: number){
        return this.authClient.send("auth.deleteRole", id)
    }
}
