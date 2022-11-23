import { Controller, Get } from '@nestjs/common';
import { AppService } from '../Service/AppService.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
