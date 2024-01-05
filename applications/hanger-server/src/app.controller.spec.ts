import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: StatusController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [AppService],
    }).compile();

    appController = app.get<StatusController>(StatusController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
