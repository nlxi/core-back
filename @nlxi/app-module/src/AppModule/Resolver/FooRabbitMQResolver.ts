import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateFooDto } from '../Dto/CreateFooDto.js';
import { PublishRequestService } from '../Service/PublishRequestService.js';

@Resolver()
export class FooRabbitMQResolver {
  constructor(private readonly publishRequestService: PublishRequestService) {}

  @Mutation(() => String)
  async createFoo(@Args('createFooDto') createFooDto: CreateFooDto) {
    this.publishRequestService.createFoo(createFooDto);
    return 'ok';
  }

  @Query(() => Number)
  async getFooCount() {
    return this.publishRequestService.getFooCount();
  }

  @Mutation(() => String)
  async createSayFoo(@Args('createFooDto') createFooDto: CreateFooDto) {
    this.publishRequestService.createSayFoo(createFooDto);
    return 'ok';
  }
}
