import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule as EnvConfigModule } from '@nestjs/config';
import { AccountModule } from './Account/Account.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { entitiesList } from './entities.list';

@Module({
  imports: [EnvConfigModule.forRoot(),
    //DB config
    ConfigModule,

  // Module listing
  DatabaseModule.forRoot({ entities: entitiesList }),
    AccountModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      }),
    }],
})
export class AppModule { }
