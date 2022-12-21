import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { RabbitMQExchangeConfigNext } from '#root/config/rabbitmq.config.js';

@Injectable()
export class NextPublishService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  emit<T>(
    exchange: RabbitMQExchangeConfigNext['name'],
    message: T,
    route: string = 'rpc-route',
  ) {
    this.amqpConnection.publish<T>(exchange, route, message);
  }
}
