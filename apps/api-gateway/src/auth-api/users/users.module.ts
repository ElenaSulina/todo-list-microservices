import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthApiModule } from '../auth-api.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [forwardRef(() =>AuthApiModule), JwtModule],
  exports: [UsersService]
})
export class UsersModule {}
