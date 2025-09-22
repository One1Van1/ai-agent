import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World! This is a NestJS TypeScript application."', () => {
      expect(appController.getHello()).toBe(
        'Hello World! This is a NestJS TypeScript application.',
      );
    });
  });

  describe('health', () => {
    it('should return health status object', () => {
      const result = appController.getHealth();
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('service', 'NestJS API');
      expect(result).toHaveProperty('timestamp');
    });
  });
});
