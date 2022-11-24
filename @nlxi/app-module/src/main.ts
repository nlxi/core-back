import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { AppModule } from './AppModule/AppModule.js';
import  type { ConfigType } from './config/index.js';



async function bootstrap() {
  const app = await NestFactory.create(AppModule,  { bufferLogs: true });
  const configService = app.get(ConfigService<ConfigType>);

  // configure logs
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());


  await app.listen(configService.get('http').port);
}


bootstrap();
