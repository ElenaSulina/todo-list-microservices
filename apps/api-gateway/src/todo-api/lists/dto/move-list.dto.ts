import { ApiProperty } from "@nestjs/swagger";

export class moveListDto {

    @ApiProperty({ example: '2',  description: 'Новый порядковый номер списка дел'})
    readonly order: number;
}