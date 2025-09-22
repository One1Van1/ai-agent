import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConnectOllamaService } from '../connect-ollama/connect-ollama.service';
import { ChatWithOllamaDto } from './chat-with-ollama.dto';
import { ChatResponse } from './chat-with-ollama.interface';

@Injectable()
export class ChatWithOllamaService {
  private readonly logger = new Logger(ChatWithOllamaService.name);

  constructor(private readonly connectOllamaService: ConnectOllamaService) {}

  async chat(chatDto: ChatWithOllamaDto): Promise<ChatResponse> {
    try {
      // Check if connected to Ollama
      const status = this.connectOllamaService.getConnectionStatus();
      if (!status.isConnected) {
        throw new HttpException(
          'Not connected to Ollama. Please connect first using /ai-agent/ollama/connect',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      this.logger.log(
        `Processing chat request: ${chatDto.prompt.substring(0, 100)}...`,
      );

      // Enhance prompt for better code generation
      const enhancedPrompt = this.enhancePrompt(chatDto.prompt);

      // Send prompt to Ollama
      const ollamaResponse =
        await this.connectOllamaService.sendPrompt(enhancedPrompt);

      if (ollamaResponse.success) {
        this.logger.log(
          `Chat completed successfully in ${ollamaResponse.responseTime}ms`,
        );

        return {
          success: true,
          data: ollamaResponse.data,
          metadata: {
            model: ollamaResponse.model || 'unknown',
            responseTime: ollamaResponse.responseTime || 0,
          },
        };
      } else {
        this.logger.error(`Chat failed: ${ollamaResponse.error}`);

        return {
          success: false,
          error: ollamaResponse.error,
        };
      }
    } catch (error: any) {
      this.logger.error(`Chat service error: ${error.message}`);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        `Chat failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private enhancePrompt(originalPrompt: string): string {
    // Add context to help AI understand the project structure
    const context = `
You are an expert NestJS TypeScript developer working on a project with specific architecture:

Project Architecture:
- Use TypeScript for all code
- Follow NestJS best practices with decorators
- Create separate folders for each endpoint (one endpoint = one folder)
- Each endpoint folder contains: controller, service, dto, module, interface, spec files
- Use kebab-case for folder and file names
- Always use yarn instead of npm
- Include proper validation with class-validator
- Add Swagger documentation with decorators
- Implement proper error handling

Code Style:
- Use 2 spaces for indentation
- Use single quotes for strings
- Include semicolons
- Use arrow functions where appropriate
- Follow the existing project patterns

User Request: ${originalPrompt}

Please provide a detailed, practical response that follows these guidelines.
    `;

    return context;
  }

  async analyzeTask(task: string): Promise<ChatResponse> {
    const analysisPrompt = `
Analyze this development task and provide a structured JSON response:

Task: ${task}

Please provide a JSON response with:
{
  "taskType": "module|endpoint|feature|bug_fix|optimization",
  "complexity": 1-10,
  "estimatedTimeHours": number,
  "requiredFiles": ["list of files to create/modify"],
  "dependencies": ["list of npm packages needed"],
  "steps": ["step 1", "step 2", "step 3", ...],
  "considerations": ["important notes", "potential issues", ...]
}

Be specific and practical.
    `;

    return await this.chat({ prompt: analysisPrompt });
  }

  async generateCode(
    type: string,
    name: string,
    specifications: string,
  ): Promise<ChatResponse> {
    const codePrompt = `
Generate complete ${type} code for: ${name}

Specifications: ${specifications}

Requirements:
1. Create a complete NestJS ${type} with TypeScript
2. Include all necessary imports and decorators
3. Add proper validation with class-validator
4. Include Swagger documentation
5. Add error handling
6. Follow project naming conventions (kebab-case)
7. Generate related files: controller, service, dto, module, interface, spec

Please provide the complete file contents for each file.
    `;

    return await this.chat({ prompt: codePrompt });
  }
}
