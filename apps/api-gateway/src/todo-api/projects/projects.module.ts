import { forwardRef, Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TodoApiModule } from '../todo-api.module';
import { JwtModule } from '@nestjs/jwt';



@Module({
    controllers: [ProjectsController],
    providers: [ProjectsService],
    imports: [
        forwardRef(() =>TodoApiModule),
        JwtModule,
    ],
    exports: [ProjectsService]
})
export class ProjectsModule {}
