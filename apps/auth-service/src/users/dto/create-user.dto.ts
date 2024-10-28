import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";


export class CreateUserDto {
    @ApiProperty({ example: 'Иван',  description: 'Имя'})
    @IsString({message: "Некорректное имя"})
    @IsNotEmpty({message: "Имя не указано"})
    @Length(2, 50, {message: "Некорректная длина имени"})
    readonly firstName: string;

    @ApiProperty({ example: 'Иванов',  description: 'Фамилия'})
    @IsString({message: "Некорректная фамилия"})
    @IsNotEmpty({message: "Фамилия не указана"})
    @Length(2, 50, {message: "Некорректная длина фамилии"})
    readonly lastName: string;

    @ApiProperty({ example: 'example@gmail.com',  description: 'E-mail'})
    @IsEmail({}, {message: "Некорректный e-mail"})
    readonly email: string;

    @ApiProperty({ example: '12345678',  description: 'Пароль'})
    @IsStrongPassword({}, {message: "Недостаточно надежный пароль"})
    readonly password: string;
}