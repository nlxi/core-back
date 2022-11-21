import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule/AppModule';
import { ConfigService } from '@nestjs/config';
import  type { ConfigType } from './config';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule,  { bufferLogs: true });
  const configService = app.get(ConfigService<ConfigType>);

  // configure logs
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  await app.listen(configService.get('http').port);
}


bootstrap();
