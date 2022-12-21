import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AppController } from './Controller/AppController.js';
import { AppService } from './Service/AppService.js';
import config from '#root/config/index.js';
import { buildLoggerOptions } from '#root/config/logger.config.js';
import { buildOrmConfig, TypeormLogger } from '#root/config/orm.config.js';
import { Foo } from './Entity/Foo.js';
import { ExampleRedisModule } from '#root/ExampleRedisModule/index.js';
import { FooResolver } from './Resolver/FooResolver.js';
import { HealthModule } from '#root/HealthModule/HealthModule.js';
import { buildRabbitMQConfig } from '#root/config/rabbitmq.config.js';
import { NextPublishService } from './MQ/NextPublishService.js';
import { CreateFooService } from './Service/CreateFooService.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        buildLoggerOptions({
          env: configService.get('env'),
          lokiHostname: configService.get('lokiHostname'),
        }),
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('rabbitMQUri'),
        ...buildRabbitMQConfig(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService, TypeormLogger],
      useFactory: (configService: ConfigService, logger: TypeormLogger) =>
        buildOrmConfig({
          ...configService.get('db'),
          logger,
        }),
      extraProviders: [TypeormLogger],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: configService.get('redis'),
      }),
    }),
    TypeOrmModule.forFeature([Foo]),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const base = {
          autoSchemaFile: true,
          sortSchema: true,
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
        };
        let prodConfig = {};
        if (configService.get('env') === 'production') {
          prodConfig = {
            debug: false,
            plugins: [],
          };
        }
        return {
          ...base,
          ...prodConfig,
        };
      },
    }),
    ExampleRedisModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, FooResolver, NextPublishService, CreateFooService],
})
export class AppModule {}
