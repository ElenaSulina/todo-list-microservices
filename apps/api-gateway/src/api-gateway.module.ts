import { Module } from '@nestjs/common';
import { AuthApiModule } from './auth-api/auth-api.module';
import { TodoApiModule } from './todo-api/todo-api.module';

@Module({
  imports: [AuthApiModule, TodoApiModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
