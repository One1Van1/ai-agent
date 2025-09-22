import { Module } from '@nestjs/common';
import { ChatWithOllamaController } from './chat-with-ollama.controller';
import { ChatWithOllamaService } from './chat-with-ollama.service';
import { ConnectOllamaModule } from '../connect-ollama/connect-ollama.module';

@Module({
  imports: [ConnectOllamaModule],
  controllers: [ChatWithOllamaController],
  providers: [ChatWithOllamaService],
  exports: [ChatWithOllamaService],
})
export class ChatWithOllamaModule {}
