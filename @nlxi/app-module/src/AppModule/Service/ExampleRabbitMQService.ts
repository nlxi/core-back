import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Foo } from '#root/AppModule/Entity/Foo.js';

@Injectable()
export class ExampleRabbitMQService {
  constructor(
    @InjectRepository(Foo)
    private repo: Repository<Foo>,
    @InjectPinoLogger(ExampleRabbitMQService.name)
    private logger: PinoLogger,
  ) {}

  @RabbitSubscribe({
    exchange: 'exchange-1',
    routingKey: 'CreateFooRabbitSubscribe-route',
    queue: 'CreateFooRabbitSubscribe-queue',
  })
  async createFoo(foo: Foo) {
    await this.repo.insert(foo);
  }

  @RabbitRPC({
    exchange: 'exchange-1',
    routingKey: 'GetFooCountRPC-route',
    queue: 'GetFooCountRPC-queue',
  })
  async getFooCount(): Promise<number> {
    return this.repo.count();
  }

  @RabbitSubscribe({
    exchange: 'exchange-1',
    routingKey: 'CreateFooFirstHandlerRabbitSubscribe-route',
    queue: 'CreateFooFirstHandlerRabbitSubscribe-queue',
  })
  async createFooFirstHandler(foo: Foo) {
    await this.repo.insert(foo);
  }

  @RabbitSubscribe({
    exchange: 'exchange-1',
    routingKey: 'CreateFooFirstHandlerRabbitSubscribe-route',
    queue: 'SayFooSecondHandlerRabbitSubscribe-queue',
  })
  async sayFooSecondHandler() {
    await this.logger.info('Foo');
  }
}
