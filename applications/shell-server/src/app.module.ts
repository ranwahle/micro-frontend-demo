import { Module } from '@nestjs/common';
import { ApplicationsListController } from './micr-apps-list.controller';
import { WidgetsListController } from './widgets-list.controller';

@Module({
  imports: [],
  controllers: [ApplicationsListController, WidgetsListController],
  providers: [],
})
export class AppModule {}
