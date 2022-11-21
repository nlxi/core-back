import { Module } from '@nestjs/common';
import { AppController } from './Controller/AppController';
import { AppService } from './Service/AppService';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config  from '@nlxi/app-module/config';
import { LoggerModule } from 'nestjs-pino';
import { buildLoggerOptions}  from '@nlxi/app-module/config/logger.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildOrmConfig } from '@nlxi/app-module/config/orm.config';




/*
 *
 * https://trilon.io/blog/announcing-nestjs-8-whats-new#Template-literal-types-and-ConfigService
 * */
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
    })


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
