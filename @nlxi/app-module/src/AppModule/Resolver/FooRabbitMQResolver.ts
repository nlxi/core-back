import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateFooDto } from '../Dto/CreateFooDto.js';

@Resolver()
export class FooRabbitMQResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => String)
  async createFoo(@Args('createFooDto') createFooDto: CreateFooDto) {
    this.amqpConnection.publish<CreateFooDto>(
      'exchange-1',
      'CreateFooRabbitSubscribe-route',
      createFooDto,
    );
    return 'ok';
  }

  @Query(() => Number)
  async getFooCount() {
    return this.amqpConnection.request<number>({
      exchange: 'exchange-1',
      routingKey: 'GetFooCountRPC-route',
      timeout: 10000,
    });
  }

  @Mutation(() => String)
  async createSayFoo(@Args('createFooDto') createFooDto: CreateFooDto) {
    this.amqpConnection.publish<CreateFooDto>(
      'exchange-1',
      'CreateFooFirstHandlerRabbitSubscribe-route',
      createFooDto,
    );
    return 'ok';
  }
}
