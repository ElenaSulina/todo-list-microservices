import { forwardRef, Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { AuthApiModule } from '../auth-api.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    forwardRef(() =>AuthApiModule),
    JwtModule
  ],
  exports: [RolesService]
})
export class RolesModule {}
