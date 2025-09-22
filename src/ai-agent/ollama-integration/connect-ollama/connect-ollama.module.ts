import { Module } from '@nestjs/common';
import { ConnectOllamaController } from './connect-ollama.controller';
import { ConnectOllamaService } from './connect-ollama.service';

@Module({
  controllers: [ConnectOllamaController],
  providers: [ConnectOllamaService],
  exports: [ConnectOllamaService],
})
export class ConnectOllamaModule {}
