import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateFooDto } from '../Dto/CreateFooDto.js';

@Injectable()
export class PublishRequestService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  createFoo(createFooDto) {
    this.amqpConnection.publish<CreateFooDto>(
      'exchange-1',
      'CreateFooRabbitSubscribe-route',
      createFooDto,
    );
  }

  async getFooCount() {
    return this.amqpConnection.request<number>({
      exchange: 'exchange-1',
      routingKey: 'GetFooCountRPC-route',
      timeout: 10000,
    });
  }

  async createSayFoo(createFooDto) {
    this.amqpConnection.publish<CreateFooDto>(
      'exchange-1',
      'CreateFooFirstHandlerRabbitSubscribe-route',
      createFooDto,
    );
  }
}
