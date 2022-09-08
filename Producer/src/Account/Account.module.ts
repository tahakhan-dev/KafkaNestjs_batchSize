import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AccountCommandHandler } from './commands.handler';
import { AccountQueryHandler } from './query.handler';
import { AccountService } from './Account.service';
import { AccountRepository } from './Account.repository';
import { AccountController } from './Account.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountCommand } from './commands/Account.command';
import * as fs from 'fs';
import 'dotenv/config';


@Module({
    imports: [
        ClientsModule.register([
            {
                name: process.env.KAFKA_NAME,
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: process.env.KAFKA_CLIENT_ID,
                        brokers: [process.env.BROKER_IP],
                        ssl: false,
                    },
                    producer: {
                        allowAutoTopicCreation: true
                    }
                },

            },
        ]),
        CqrsModule
    ],
    providers: [
        AccountService,
        AccountRepository,
        AccountCommandHandler,
        AccountCommand,
        AccountQueryHandler,
    ],
    controllers: [AccountController],
    exports: [AccountService],
})
export class AccountModule { }
