import { Controller, Get } from '@nestjs/common';

interface Widget {
  url: string;
  label: string;
}

@Controller()
export class WidgetsListController {
  @Get('widgets-list')
  /**
   * Retrieves the list of widgets.
   * @returns An array of Widget objects.
   */
  widgetsList(): Widget[] {
    return [
      {
        label: 'Washing Machine Status',
        url: '/washingmachine/widgets/status',
      },
      {
        label: 'Clothes in bucket',
        url: '/washingmachine/widgets/cloths-in-stock',
      },
      {
        label: 'Clothes on hanger',
        url: '/hanger/widgets/clothes-on-hanger',
      },
    ];
  }
}
