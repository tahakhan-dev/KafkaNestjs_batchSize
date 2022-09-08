import { Injectable } from '@nestjs/common';
import { ConfigData, ConfigDBData } from './config.interface';
import {DEFAULT_CONFIG, EVENT_STORE_CONFIG} from './config.default';

@Injectable()
export class ConfigService {
    private config: ConfigData;
    private eventConfig: ConfigData;

    constructor(data: ConfigData = DEFAULT_CONFIG, eventConfig: ConfigData = EVENT_STORE_CONFIG) {
        this.config = data;
        this.eventConfig = eventConfig;
    }

    public lofusingDotEnv() {
        this.config = this.parseConfigFromEnv(process.env);
    }

    private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
        return {
            env: env.NODE_ENV || DEFAULT_CONFIG.env,
            port: env.PORT ? parseInt(env.PORT, 10) : DEFAULT_CONFIG.port,
            db: this.parseDbConfigFromEnv(env) || DEFAULT_CONFIG.db,
            logLevel: env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
        };
    }

    private parseDbConfigFromEnv(env: NodeJS.ProcessEnv): ConfigDBData {
        return {
            type: env.DB_TYPE || DEFAULT_CONFIG.db.type,
            user: env.MSSQL_USER || DEFAULT_CONFIG.db.user,
            pass: env.MSSQL_PASSWORD || DEFAULT_CONFIG.db.pass,
            name: env.MSSQL_DB || DEFAULT_CONFIG.db.name,
            host: env.MSSQL_DB_HOST || DEFAULT_CONFIG.db.host,
            port: parseInt(env.MSSQL_DB_PORT, 10) || DEFAULT_CONFIG.db.port,
            dialect: env.DB_DIALECT || '',
            charset: env.DB_CHARSET || '',
            collate: env.DB_COLLATE || '',
        };
    }

    public get(): Readonly<ConfigData> {
        return this.config;
    }

    public getEventConfig(): Readonly<ConfigData> {
        return this.eventConfig;
    }
}
