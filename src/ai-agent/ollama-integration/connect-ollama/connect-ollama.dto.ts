import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ConnectOllamaDto {
  @ApiProperty({
    description: 'Ollama server URL',
    example: 'http://localhost:11434',
  })
  @IsString()
  baseUrl: string;

  @ApiPropertyOptional({
    description: 'Model name to use',
    example: 'codellama:latest',
    default: 'codellama:latest',
  })
  @IsOptional()
  @IsString()
  model?: string = 'codellama:latest';

  @ApiPropertyOptional({
    description: 'Request timeout in milliseconds',
    example: 30000,
    default: 30000,
  })
  @IsOptional()
  @IsNumber()
  @Min(1000)
  @Max(300000)
  timeout?: number = 30000;
}
