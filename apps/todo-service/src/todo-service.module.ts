import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects/projects.entity';
import { List } from './lists/lists.entity';
import { Task } from './tasks/tasks.entity';
import { ProjectsModule } from './projects/projects.module';
import { ListsModule } from './lists/lists.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.TODO_DATABASE_HOST,
        port: +process.env.TODO_DATABASE_PORT,
        username: process.env.TODO_DATABASE_USERNAME,
        password: process.env.TODO_DATABASE_PASSWORD,
        database: process.env.TODO_DATABASE_NAME,
        entities: [Project, List, Task],
        synchronize: true,
        autoLoadEntities: true,
    }),
    ProjectsModule,
    ListsModule,
    TasksModule
  ],
})
export class TodoServiceModule {}
