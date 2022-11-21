export interface DBConfig {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  ssl: boolean;
}

interface PGOpts  {
  readonly type: "postgres";
  [key: string]: any
}

export const buildOrmConfig = (config:DBConfig): PGOpts => {
  const result: PGOpts = {
    type: 'postgres',
    ...config,
    synchronize: false,
    //logging: ['error', 'warn'],
    logging: 'all',
    maxQueryExecutionTime: 1000,
    entities:[],
    migrations: [],
    subscribers: [],
    useUTC: true,
    cli: {
      // entitiesDir: 'src/entity',
      // migrationsDir: 'src/migration',
      // subscribersDir: 'src/subscriber',
    },
    logNotifications: true,
    autoLoadEntities: false,
  };

  if (config.ssl) {
    result.extra =  {
      ...result.extra,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  }
  return result;
};
