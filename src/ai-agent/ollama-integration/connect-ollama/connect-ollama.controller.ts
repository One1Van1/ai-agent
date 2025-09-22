import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConnectOllamaService } from './connect-ollama.service';
import { ConnectOllamaDto } from './connect-ollama.dto';
import { OllamaResponse, OllamaHealthStatus } from './connect-ollama.interface';

@ApiTags('ai-agent-ollama')
@Controller('ai-agent/ollama')
export class ConnectOllamaController {
  constructor(private readonly connectOllamaService: ConnectOllamaService) {}

  @Post('connect')
  @ApiOperation({ summary: 'Connect to Ollama server' })
  @ApiResponse({
    status: 200,
    description: 'Successfully connected to Ollama',
    type: 'object',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid connection parameters',
  })
  @ApiResponse({
    status: 503,
    description: 'Failed to connect to Ollama server',
  })
  async connect(@Body() connectDto: ConnectOllamaDto): Promise<OllamaResponse> {
    return await this.connectOllamaService.connect(connectDto);
  }

  @Get('health')
  @ApiOperation({ summary: 'Check Ollama connection health' })
  @ApiResponse({
    status: 200,
    description: 'Health status retrieved',
    type: 'object',
  })
  async getHealth(): Promise<OllamaHealthStatus> {
    return await this.connectOllamaService.checkHealth();
  }

  @Get('status')
  @ApiOperation({ summary: 'Get current connection status' })
  @ApiResponse({
    status: 200,
    description: 'Connection status retrieved',
    type: 'object',
  })
  getStatus() {
    return this.connectOllamaService.getConnectionStatus();
  }
}
