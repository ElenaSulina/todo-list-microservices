import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"
import { RpcException } from '@nestjs/microservices';


@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(userDto){
        const user = await this.validateUser(userDto);
        return this.generateToken(user)
    }

    async signUp(userDto) {
        const userExists = await this.userService.getUserByEmail(userDto.email);

        if(userExists) {
            throw new RpcException("Пользователь с такой электронной почтой уже существует");
        }

        const user = await this.userService.addUser(userDto);
        return this.generateToken(user);
    }  

    private async generateToken(user){
        const payLoad = {
            id: user.id,
            firstName: user.firstName, 
            lastName: user.lastName,
            email: user.email,
            roles: user.roles,
            }

        return {
            token: this.jwtService.sign(payLoad)
            }
    }
    

    private async validateUser(userDto) {
        const user = await this.userService.getUserByEmail(userDto.email);

        if(user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            
            if(passwordEquals) {
                return user;
            }
        }

        throw new RpcException("Неверный e-mail или пароль")
    }
}
