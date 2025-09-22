import { Test, TestingModule } from '@nestjs/testing';
import { ConnectOllamaController } from './connect-ollama.controller';
import { ConnectOllamaService } from './connect-ollama.service';
import { ConnectOllamaDto } from './connect-ollama.dto';

describe('ConnectOllamaController', () => {
  let controller: ConnectOllamaController;
  let service: ConnectOllamaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectOllamaController],
      providers: [ConnectOllamaService],
    }).compile();

    controller = module.get<ConnectOllamaController>(ConnectOllamaController);
    service = module.get<ConnectOllamaService>(ConnectOllamaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('connect', () => {
    it('should connect to Ollama successfully', async () => {
      const connectDto: ConnectOllamaDto = {
        baseUrl: 'http://localhost:11434',
        model: 'codellama:latest',
        timeout: 30000,
      };

      const expectedResult = {
        success: true,
        data: {
          baseUrl: 'http://localhost:11434',
          model: 'codellama:latest',
          status: 'connected',
        },
      };

      jest.spyOn(service, 'connect').mockResolvedValue(expectedResult);

      const result = await controller.connect(connectDto);
      expect(result).toEqual(expectedResult);
      expect(service.connect).toHaveBeenCalledWith(connectDto);
    });

    it('should handle connection failure', async () => {
      const connectDto: ConnectOllamaDto = {
        baseUrl: 'http://invalid:11434',
        model: 'codellama:latest',
        timeout: 30000,
      };

      const expectedResult = {
        success: false,
        error: 'Connection failed: connect ECONNREFUSED',
      };

      jest.spyOn(service, 'connect').mockResolvedValue(expectedResult);

      const result = await controller.connect(connectDto);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getHealth', () => {
    it('should return health status', async () => {
      const expectedResult = {
        isConnected: true,
        model: 'codellama:latest',
        lastCheck: new Date(),
      };

      jest.spyOn(service, 'checkHealth').mockResolvedValue(expectedResult);

      const result = await controller.getHealth();
      expect(result.isConnected).toBe(true);
      expect(result.model).toBe('codellama:latest');
    });
  });

  describe('getStatus', () => {
    it('should return connection status', () => {
      const expectedResult = {
        baseUrl: 'http://localhost:11434',
        model: 'codellama:latest',
        timeout: 30000,
        isConnected: true,
      };

      jest
        .spyOn(service, 'getConnectionStatus')
        .mockReturnValue(expectedResult);

      const result = controller.getStatus();
      expect(result).toEqual(expectedResult);
    });
  });
});
