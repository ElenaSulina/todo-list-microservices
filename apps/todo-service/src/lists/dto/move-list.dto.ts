import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class moveListDto {

    @ApiProperty({ example: '2',  description: 'Новый порядковый номер списка дел'})
    readonly order: number;
}