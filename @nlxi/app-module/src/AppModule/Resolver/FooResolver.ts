import { AppService } from '../Service/AppService.js';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class FooResolver {
  constructor(
    private readonly service: AppService,
  ) {}

  @Query(returns => String)
  async hello() {
    return this.service.getHello();
  }

}
