import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsListController } from './micr-apps-list.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: ApplicationsListController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsListController],
      providers: [AppService],
    }).compile();

    appController = app.get<ApplicationsListController>(ApplicationsListController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.applicationsList()).toBe('Hello World!');
    });
  });
});
