import { Controller, Get } from '@nestjs/common';
import { MicroApplication } from './micro-application.model';

@Controller()
export class ApplicationsListController {
  @Get('/applications-list')
  applicationsList(): MicroApplication[] {
    return [
      {
        label: 'Washing Machine Status',
        url: '/washingmachine',
      },
      {
        label: 'Dirty clothes waiting',
        url: '/washingmachine/cloths-in-stock',
      },
      {
        label: 'hanger',
        url: '/hanger',
      },
    ];
  }
}
