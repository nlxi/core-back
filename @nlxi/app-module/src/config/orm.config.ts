import path from 'path';
import { DataSourceOptions , Logger } from 'typeorm';
import { fileURLToPath } from 'url';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class TypeormLogger implements Logger {
  constructor(
    @InjectPinoLogger(TypeormLogger.name)
    private logger: PinoLogger,
  ) {}

  logQuery(query: string, parameters: any[] = []): void {
    this.logger.info({ query, parameters });
  }

  logQueryError(error: string, query: string, parameters: any[] = []): void {
    this.logger.info({ query, parameters, error });
  }

  logQuerySlow(duration: number, query: string, parameters: any[] = []): void {
    this.logger.info({ query, parameters, duration });
  }

  logSchemaBuild(message: string): void {
    this.logger.debug(message);
  }

  logMigration(message: string): void {
    this.logger.info(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any): void {
    if (level === 'warn') {
      this.logger.warn(message);
    } else {
      this.logger.info(message);
    }
  }
}

export const buildOrmConfig = (
  config: DataSourceOptions,
): DataSourceOptions => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);

  const result = {
    type: 'postgres',
    ...config,
    synchronize: false,
    logging: true,
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

  if ('ssl' in config) {
    if (config.ssl) {
      result.extra = {
        ...result.extra,
        ssl: {
          rejectUnauthorized: false,
        },
      };
    }
  }
  return result;
};
