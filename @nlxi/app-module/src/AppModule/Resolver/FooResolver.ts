import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateFooDto } from '../Dto/CreateFooDto.js';
import { NextPublishService } from '../MQ/NextPublishService.js';
import { AppService } from '../Service/AppService.js';

@Resolver()
export class FooResolver {
  constructor(
    private readonly service: AppService,
    private readonly nextPublishService: NextPublishService,
  ) {}

  @Query(() => String)
  async hello() {
    return this.service.getHello();
  }

  @Mutation(() => String)
  async example_one(@Args('createFooDto') createFooDto: CreateFooDto) {
    this.nextPublishService.emit('exchange-1', createFooDto);
    return 'ok';
  }
}
