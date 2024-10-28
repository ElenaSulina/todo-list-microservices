import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { createRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@app/guards/role-auth.decorator';
import { RolesGuard } from '@app/guards/roles.guard';

@ApiTags("Роли")
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService){}

    @ApiOperation({ summary: 'Создание роли' })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: createRoleDto){
        return this.roleService.createRole(dto);
    }


    @ApiOperation({ summary: 'Получение роли по названию' })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get("/:value")
    getByValue(@Param("value") value: string){
        return this.roleService.getRoleByValue(value.toUpperCase());
    }

    
    @ApiOperation({ summary: 'Удаление роли' })
    @ApiResponse({ status: 204 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete("/:id")
    delete(@Param("id") id: number){
        return this.roleService.deleteRole(id);
    }
}
