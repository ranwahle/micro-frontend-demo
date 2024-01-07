import { Controller, Get } from '@nestjs/common';
import { MicroApplication } from './micro-application.model';

@Controller()
export class AppController {
  @Get('/applications-list')
  applicationsList(): MicroApplication[] {
    return [
      {
        label: 'Washing Machine Status',
        url: '/washingmachine',
      },
      {
        label: 'Cloths in stock',
        url: '/washingmachine/cloths-in-stock',
      },
      {
        label: 'hanger',
        url: '/hanger',
      },
    ];
  }
}
