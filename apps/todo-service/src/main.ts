import { NestFactory } from '@nestjs/core';
import { TodoServiceModule } from './todo-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TodoServiceModule,
    {
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
    }
  )
  await app.listen();
}

bootstrap();
