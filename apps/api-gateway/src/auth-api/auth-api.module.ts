import { forwardRef, Module } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
    providers: [
        {
            provide: "AUTH_SERVICE",
            useFactory: (): ClientProxy => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [
                            `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
                          ],
                          queue: 'auth_queue',
                          queueOptions: {
                            durable: false,
                        }
                    }
                })
            }
        },
    ],
    imports: [
        forwardRef(() =>AuthModule),
        forwardRef(() =>RolesModule),
        forwardRef(() =>UsersModule)
    ],
    exports: ["AUTH_SERVICE"]
})
export class AuthApiModule {}
