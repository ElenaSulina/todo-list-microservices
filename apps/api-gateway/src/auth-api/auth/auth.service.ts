import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {

    constructor(
        @Inject("AUTH_SERVICE") private authClient: ClientProxy,
    ){}
    
    async signIn(userDto: SignInDto){
        return this.authClient.send("auth.signIn", userDto)
    }

    async signUp(userDto: CreateUserDto){
        return this.authClient.send("auth.signUp", userDto)
    }
}
