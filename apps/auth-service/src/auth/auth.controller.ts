import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern("auth.signIn")
  signIn(@Payload() userDto) {
    return this.authService.signIn(userDto);
  }

  @MessagePattern("auth.signUp")
  signUp(@Payload() userDto) {
    return this.authService.signUp(userDto)
  }
}
