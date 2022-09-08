import { ConfigData } from './config.interface';

const userName = 'sa';
const pass = '4Fay575b';
const host = '35.192.139.102';
const dbName = 'hk_db_dev';

export const DEFAULT_CONFIG: ConfigData = {
    env: 'DEVELOPMENT',
    port: 3000,
    db: {
        type: 'mssql',
        host,
        name: dbName,
        user: userName,
        pass,
        port: 1433,
    },
    logLevel: 'info',
};

export const EVENT_STORE_CONFIG: ConfigData = {
    env: 'DEVELOPMENT',
    port: 3000,
    db: {
        type: 'mssql',
        host,
        name: 'hk_events',
        user: userName,
        pass,
        port: 1433,
    },
    logLevel: 'info',
};
