import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class moveTaskDto {

    @ApiProperty({ example: '1',  description: 'Уникальный идентификатор списка задач'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly listId: number;

    @ApiProperty({ example: '2',  description: 'Новый порядковый номер задачи'})
    readonly order: number;
}