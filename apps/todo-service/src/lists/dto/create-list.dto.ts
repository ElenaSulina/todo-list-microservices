import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Project } from "../../projects/projects.entity";

export class createListDto {
    @ApiProperty({ example: 'Выполнить',  description: 'Название списка дел'})
    @IsString()
    @IsNotEmpty({message: "Название списка обязательно"})
    readonly name: string;

    @ApiProperty({ example: '1',  description: 'Уникальный идентификатор проекта'})
    @IsNotEmpty({message: "Идентификатор проекта обязателен"})
    readonly project: Project;
}