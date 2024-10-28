import { forwardRef, Module } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ProjectsModule } from './projects/projects.module';
import { ListsModule } from './lists/lists.module';
import { TasksModule } from './tasks/tasks.module';


@Module({
    providers: [
        {
            provide: "TODO_SERVICE",
            useFactory: (): ClientProxy => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [
                        `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
                        ],
                        queue: 'todo_queue',
                        queueOptions: {
                        durable: false,
                    }
                    }
                })
            }
        } 
    ],
    imports: [
        forwardRef(() =>ProjectsModule),
        forwardRef(() =>ListsModule),
        forwardRef(() =>TasksModule)
    ],
    exports: ["TODO_SERVICE"]
})
export class TodoApiModule {}
