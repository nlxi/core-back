import { Module } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { Logger } from 'nestjs-pino';

@Injectable()
export class TestService {
  constructor(
    @InjectRedis() private readonly redis: Redis
  ) { }

  async readRedis(key: string) {
    return this.redis.get(key);
  }
}

@Module({
  providers: [TestService],
})
export class ExampleRedis {
  constructor(private testService: TestService, private logger: Logger) {
  }

  async onApplicationBootstrap() {
    const result = await this.testService.readRedis('foobar');
    this.logger.log(`testService: ${result}`)
  }
}
