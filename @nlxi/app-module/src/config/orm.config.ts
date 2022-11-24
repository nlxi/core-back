import path from 'path';
import { fileURLToPath } from 'url';

export interface DBConfig {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  ssl: boolean;
}

interface PGOpts {
  readonly type: 'postgres';
  [key: string]: any;
}

export const buildOrmConfig = (config: DBConfig): PGOpts => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);

  const result: PGOpts = {
    type: 'postgres',
    ...config,
    synchronize: false,
    // logging: ['error', 'warn'],
    logging: 'all',
    maxQueryExecutionTime: 1000,
    entities: [`${dirname}/../**/Entity/**/!(*.spec).{ts,js}`],
    migrations: [`${dirname}/../migration/**/*.{ts,js}`],
    subscribers: [],
    useUTC: true,
    cli: {
      migrationsDir: 'src/migration',
      // entitiesDir: 'src/entity',
      // subscribersDir: 'src/subscriber',
    },
    logNotifications: true,
    autoLoadEntities: false,
  };

  if (config.ssl) {
    result.extra = {
      ...result.extra,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
  return result;
};
