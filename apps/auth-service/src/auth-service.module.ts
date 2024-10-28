import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Role } from './roles/roles.entity';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
          envFilePath: '.env'
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.AUTH_DATABASE_HOST,
            port: +process.env.AUTH_DATABASE_PORT,
            username: process.env.AUTH_DATABASE_USERNAME,
            password: process.env.AUTH_DATABASE_PASSWORD,
            database: process.env.AUTH_DATABASE_NAME,
            entities: [User, Role],
            synchronize: true,
            autoLoadEntities: true,
        }),
        AuthModule,
        RolesModule,
        UsersModule
    ],
})
export class AuthServiceModule {}
