import { Resolver, Query } from '@nestjs/graphql';
import { AppService } from '../Service/AppService.js';

@Resolver()
export class FooResolver {
  constructor(
    private readonly service: AppService,
  ) {}

  @Query(() => String)
  async hello() {
    return this.service.getHello();
  }

}
