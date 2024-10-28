import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @ApiOperation({ summary: 'Вход через JWT токен' })
    @ApiResponse({ status: 200, description: "Создан JWT Token", example: "eyJhbGciOiJIUzI1NVCJ9.eyJpZCcnN0TmFtbSIsInJvbGVzIjpbeyJpZC"})
    @Post("/signin")
    signin(@Body() userDto: SignInDto){
        return this.authService.signIn(userDto)
    }

    @ApiOperation({ summary: 'Регистрация через JWT токен' })
    @ApiResponse({ status: 200, description: "Создан JWT Token", example: "eyJhbGciOiJIUzI1NVCJ9.eyJpZCcnN0TmFtbSIsInJvbGVzIjpbeyJpZC"})
    @Post("/signup")
    signup(@Body() userDto: CreateUserDto){
        return this.authService.signUp(userDto)
    }
}


