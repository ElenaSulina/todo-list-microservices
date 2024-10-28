import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class createProjectDto {
    @ApiProperty({ example: 'Мои дела',  description: 'Название проекта'})
    @IsNotEmpty({message: "Название проекта обязательно"})
    readonly name: string;

    @ApiProperty({ example: 'Список моих дел',  description: 'Описание проекта'})
    readonly description: string;
}