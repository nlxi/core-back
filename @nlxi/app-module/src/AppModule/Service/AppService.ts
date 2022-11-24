
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Foo } from '../Entity/Foo.js';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Foo)
    private repo: Repository<Foo>,
  ) {}

  async getHello(): Promise<string> {
    const count = await this.repo.count();
    return `Hello with ${count}`;
  }
}
