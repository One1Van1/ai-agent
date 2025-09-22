import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConnectOllamaDto } from './connect-ollama.dto';
import {
  OllamaConnectionConfig,
  OllamaResponse,
  OllamaHealthStatus,
} from './connect-ollama.interface';

@Injectable()
export class ConnectOllamaService {
  private readonly logger = new Logger(ConnectOllamaService.name);
  private axiosInstance: AxiosInstance;
  private config: OllamaConnectionConfig;
  private isConnected = false;

  constructor() {
    // Default configuration
    this.config = {
      baseUrl: 'http://localhost:11434',
      model: 'codellama:latest',
      timeout: 30000,
    };

    this.initializeAxios();
  }

  async connect(connectDto: ConnectOllamaDto): Promise<OllamaResponse> {
    try {
      this.logger.log(`Connecting to Ollama at ${connectDto.baseUrl}`);

      // Update configuration
      this.config = {
        baseUrl: connectDto.baseUrl,
        model: connectDto.model || 'codellama:latest',
        timeout: connectDto.timeout || 30000,
      };

      this.initializeAxios();

      // Test connection by checking if model exists
      const healthCheck = await this.checkHealth();

      if (healthCheck.isConnected) {
        this.isConnected = true;
        this.logger.log(
          `Successfully connected to Ollama with model: ${this.config.model}`,
        );

        return {
          success: true,
          data: {
            baseUrl: this.config.baseUrl,
            model: this.config.model,
            status: 'connected',
          },
        };
      } else {
        throw new Error('Failed to establish connection');
      }
    } catch (error) {
      this.logger.error(`Failed to connect to Ollama: ${error.message}`);
      this.isConnected = false;

      return {
        success: false,
        error: `Connection failed: ${error.message}`,
      };
    }
  }

  async checkHealth(): Promise<OllamaHealthStatus> {
    try {
      // Check if Ollama server is running
      const response = await this.axiosInstance.get('/api/tags');

      // Check if our model is available
      const models = response.data.models || [];
      const modelExists = models.some((model: any) =>
        model.name.includes(this.config.model.split(':')[0]),
      );

      if (!modelExists) {
        this.logger.warn(
          `Model ${this.config.model} not found. Available models: ${models.map((m: any) => m.name).join(', ')}`,
        );
      }

      return {
        isConnected: true,
        model: this.config.model,
        version: response.data.version,
        lastCheck: new Date(),
      };
    } catch (error) {
      this.logger.error(`Health check failed: ${error.message}`);

      return {
        isConnected: false,
        model: this.config.model,
        lastCheck: new Date(),
      };
    }
  }

  async sendPrompt(prompt: string): Promise<OllamaResponse> {
    if (!this.isConnected) {
      throw new HttpException(
        'Not connected to Ollama. Please connect first.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    try {
      const startTime = Date.now();

      this.logger.log(
        `Sending prompt to ${this.config.model}: ${prompt.substring(0, 100)}...`,
      );

      const response = await this.axiosInstance.post('/api/generate', {
        model: this.config.model,
        prompt: prompt,
        stream: false,
      });

      const responseTime = Date.now() - startTime;

      this.logger.log(`Received response in ${responseTime}ms`);

      return {
        success: true,
        data: response.data.response,
        model: this.config.model,
        responseTime,
      };
    } catch (error) {
      this.logger.error(`Failed to send prompt: ${error.message}`);

      return {
        success: false,
        error: `Prompt failed: ${error.message}`,
      };
    }
  }

  getConnectionStatus(): OllamaConnectionConfig & { isConnected: boolean } {
    return {
      ...this.config,
      isConnected: this.isConnected,
    };
  }

  private initializeAxios(): void {
    this.axiosInstance = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for logging
    this.axiosInstance.interceptors.request.use(
      (config) => {
        this.logger.debug(
          `Making request to: ${config.method?.toUpperCase()} ${config.url}`,
        );
        return config;
      },
      (error) => {
        this.logger.error(`Request error: ${error.message}`);
        return Promise.reject(error);
      },
    );

    // Add response interceptor for logging
    this.axiosInstance.interceptors.response.use(
      (response) => {
        this.logger.debug(`Response received: ${response.status}`);
        return response;
      },
      (error) => {
        this.logger.error(
          `Response error: ${error.response?.status} - ${error.message}`,
        );
        return Promise.reject(error);
      },
    );
  }
}
