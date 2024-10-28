import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';
import { createRoleDto } from './dto/create-role.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class RolesController {
    constructor(private roleService: RolesService){}


    @MessagePattern("auth.createRole")
    create(@Payload() dto: createRoleDto){
        return this.roleService.createRole(dto);
    }


    @MessagePattern("auth.getRoleByValue")
    getByValue(@Payload() value: string){
        return this.roleService.getRoleByValue(value.toUpperCase());
    }


    @MessagePattern("auth.deleteRole")
    delete(@Payload() id: number){
        return this.roleService.deleteRole(id);
    }
}
