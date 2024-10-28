import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ListsService } from './lists.service';
import { createListDto } from './dto/create-list.dto';
import { moveListDto } from './dto/move-list.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/guards/jwt-auth.guard';

@ApiTags("Списки задач")
@Controller('lists')
export class ListsController {
    constructor(private listsService: ListsService) {}


    @ApiOperation({ summary: 'Создание списка задач' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: createListDto){
        return this.listsService.createList(dto);
    }

    
    @ApiOperation({ summary: 'Получение списка задач по id' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    open(@Req() req, @Param("id") id: number) {
        return this.listsService.getListById(req.user.id, id)
    }


    @ApiOperation({ summary: 'Изменение списка задач' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Put("/:id") 
    updateList(@Req() req, @Param("id") id: number, @Body() dto: createListDto) {
        return this.listsService.updateList(req.user.id, id, dto);
    }


    @ApiOperation({ summary: 'Изменение порядкового номера списка задач в проекте' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Post("/:id/move")
    move(@Req() req, @Param("id") id: number, @Body() dto: moveListDto){
        return this.listsService.moveList(req.user.id, id, dto);
    }

    @ApiOperation({ summary: 'Удаление списка задач' })
    @ApiResponse({ status: 204 })
    @UseGuards(JwtAuthGuard)
    @Delete("/:id") 
    deleteList(@Req() req, @Param("id") id: number) {
        return this.listsService.deleteList(req.user.id, id);
    }
}
