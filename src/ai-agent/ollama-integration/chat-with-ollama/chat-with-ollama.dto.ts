import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChatWithOllamaDto {
  @ApiProperty({
    description: 'Prompt to send to AI model',
    example: 'Create a NestJS controller for user management',
  })
  @IsString()
  prompt: string;

  @ApiPropertyOptional({
    description: 'Temperature for response randomness (0.0 to 1.0)',
    example: 0.1,
    default: 0.1,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  temperature?: number = 0.1;

  @ApiPropertyOptional({
    description: 'Maximum tokens in response',
    example: 4096,
    default: 4096,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(8192)
  maxTokens?: number = 4096;
}
