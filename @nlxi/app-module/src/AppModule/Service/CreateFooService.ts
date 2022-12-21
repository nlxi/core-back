import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RabbitRPCNext } from '#root/config/rabbitmq.config.js';

@Injectable()
export class CreateFooService {
  constructor(
    @InjectPinoLogger(CreateFooService.name)
    private logger: PinoLogger,
  ) {}

  @RabbitRPCNext({
    exchange: 'exchange-1',
  })
  public async rpcHandler(msg: {}) {
    this.logger.info(msg);
    return {
      response: 42,
    };
  }
}
