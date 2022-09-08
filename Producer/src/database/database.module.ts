import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigDBData } from '../config/config.interface';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { DbConfig } from './db.interface';
import { DbConfigError } from './db.error';

@Module({})
export class DatabaseModule {
    static forRoot(dbconfig: DbConfig): DynamicModule {
        return {
            global: true,
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: (configService: ConfigService) =>
                        DatabaseModule.getConnectionOptions(configService, dbconfig),
                    inject: [ConfigService],
                }),
            ],
        };
    }

    static forRootEvent(dbconfig: DbConfig): DynamicModule {
        return {
            global: true,
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRootAsync({
                    name: 'event_store',
                    imports: [ConfigModule],
                    useFactory: (configService: ConfigService) =>
                        DatabaseModule.getConnectionEventStoreOptions(configService, dbconfig),
                    inject: [ConfigService],
                }),
            ],
        };
    }

    public static getConnectionOptions(config: ConfigService, dbconfig: DbConfig): TypeOrmModuleOptions {
        const dbdata = config.get().db;
        let connectionOptions: TypeOrmModuleOptions;

        if (!dbdata) {
            throw new DbConfigError('Database config is missing');
        }
        connectionOptions = this.getConnectionOptionsMssql(dbdata);

        return {
            ...connectionOptions,
            entities: dbconfig.entities,
            logging: true,
            extra: {
                "validateConnection": false,
                "trustServerCertificate": true
            }
        };
    }

    public static getConnectionEventStoreOptions(config: ConfigService, dbconfig: DbConfig): TypeOrmModuleOptions {
        const dbdata = config.getEventConfig().db;
        let connectionOptions: TypeOrmModuleOptions;

        if (!dbdata) {
            throw new DbConfigError('Database config is missing');
        }
        connectionOptions = this.getConnectionOptionsMssql(dbdata);
        return {
            ...connectionOptions,
            entities: dbconfig.entities,
            logging: true,
            extra: {
                "validateConnection": false,
                "trustServerCertificate": true
            }
        };
    }

    private static getConnectionOptionsMssql(dbdata: ConfigDBData): TypeOrmModuleOptions {
        return {
            type: 'mssql',
            host: process.env.MSSQL_DB_HOST || dbdata.host,
            port: +process.env.MSSQL_DB_PORT || dbdata.port,
            username: process.env.MSSQL_USER || dbdata.user,
            password: process.env.MSSQL_PASSWORD || dbdata.pass,
            database: process.env.MSSQL_DB || dbdata.name,
        };
    }
}
