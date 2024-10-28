import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class createRoleDto {
    @ApiProperty({ example: 'ADMIN',  description: 'Значение роли пользователя'})
    @IsString()
    @IsNotEmpty({message: "Значение роли пользователя обязательно"})
    readonly value: string;
    
    @ApiProperty({ example: 'Администратор',  description: 'Описание роли на русском языке'})
    @IsString()
    @IsNotEmpty({message: "Описание роли пользователя обязательно"})
    readonly description: string;
}