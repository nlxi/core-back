import { Module } from '@nestjs/common';
import { AppController } from './Controller/AppController.js';
import { AppService } from './Service/AppService.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config  from '#root/config/index.js';
import { LoggerModule } from 'nestjs-pino';
import { buildLoggerOptions}  from '#root/config/logger.config.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildOrmConfig } from '#root/config/orm.config.js';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Foo } from './Entity/Foo.js';
import { ExampleRedis } from './ExampleRedis';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return buildLoggerOptions({ env: configService.get('env')});
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return buildOrmConfig(configService.get('db'));
      }
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('redis'),
    }),
    TypeOrmModule.forFeature([Foo]),
    ExampleRedis,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
