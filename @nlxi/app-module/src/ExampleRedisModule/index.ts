import { Module, Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

@Injectable()
export class TestService {
  constructor(@InjectRedis() private readonly redis: Redis.default) {}

  async readRedis(key: string) {
    return this.redis.get(key);
  }
}

@Module({
  providers: [TestService],
})
export class ExampleRedisModule {
  constructor(
    private testService: TestService,
    @InjectPinoLogger(ExampleRedisModule.name)
    private logger: PinoLogger,
  ) {}

  async onApplicationBootstrap() {
    const result = await this.testService.readRedis('foobar');
    this.logger.info(`testService: ${result}`);
  }
}
