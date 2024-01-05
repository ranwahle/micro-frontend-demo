import { Controller, Get } from '@nestjs/common';
import { MicroApplication } from './micro-application.model';

@Controller()
export class AppController {
  @Get('/applications-list')
  getHello(): MicroApplication[] {
    return [
      {
        name: 'washingmachine',
        url: '/washingmachine',
      },
      {
        name: 'hanger',
        url: '/hanger',
      },
    ];
  }
}
