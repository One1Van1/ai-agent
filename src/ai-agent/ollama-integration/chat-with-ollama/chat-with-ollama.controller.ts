import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatWithOllamaService } from './chat-with-ollama.service';
import { ChatWithOllamaDto } from './chat-with-ollama.dto';
import { ChatResponse } from './chat-with-ollama.interface';

@ApiTags('ai-agent-ollama')
@Controller('ai-agent/ollama')
export class ChatWithOllamaController {
  constructor(private readonly chatWithOllamaService: ChatWithOllamaService) {}

  @Post('chat')
  @ApiOperation({ summary: 'Chat with Ollama AI model' })
  @ApiResponse({
    status: 200,
    description: 'AI response received successfully',
    type: 'object',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid chat parameters',
  })
  @ApiResponse({
    status: 503,
    description: 'Ollama service unavailable',
  })
  async chat(@Body() chatDto: ChatWithOllamaDto): Promise<ChatResponse> {
    return await this.chatWithOllamaService.chat(chatDto);
  }

  @Post('analyze')
  @ApiOperation({ summary: 'Analyze a development task' })
  @ApiResponse({
    status: 200,
    description: 'Task analysis completed',
    type: 'object',
  })
  async analyzeTask(@Body() body: { task: string }): Promise<ChatResponse> {
    return await this.chatWithOllamaService.analyzeTask(body.task);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate code with AI' })
  @ApiResponse({
    status: 200,
    description: 'Code generated successfully',
    type: 'object',
  })
  async generateCode(
    @Body() body: { type: string; name: string; specifications: string },
  ): Promise<ChatResponse> {
    return await this.chatWithOllamaService.generateCode(
      body.type,
      body.name,
      body.specifications,
    );
  }
}
