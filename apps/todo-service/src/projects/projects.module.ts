import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers: [ProjectsController],
    providers: [ProjectsService],
    imports: [
        TypeOrmModule.forFeature([Project])
    ],
    exports: [ProjectsService]
})
export class ProjectsModule {}
