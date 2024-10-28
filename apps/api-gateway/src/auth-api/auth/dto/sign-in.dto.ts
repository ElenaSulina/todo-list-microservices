import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SignInDto {

    @ApiProperty({ example: 'example@gmail.com',  description: 'E-mail'})
    @IsEmail({}, {message: "Некорректный e-mail"})
    readonly email: string;

    @ApiProperty({ example: '12345678',  description: 'Пароль'})
    @IsString({message: "Некорректный пароль"})
    readonly password: string;
}