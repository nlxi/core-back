import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule/AppModule.js';
import { ConfigService } from '@nestjs/config';
import  type { ConfigType } from './config/index.js';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';



async function bootstrap() {
  const app = await NestFactory.create(AppModule,  { bufferLogs: true });
  const configService = app.get(ConfigService<ConfigType>);

  // configure logs
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());


  await app.listen(configService.get('http').port);
}


bootstrap();
