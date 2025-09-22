import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectOllamaModule } from './ai-agent/ollama-integration/connect-ollama/connect-ollama.module';
import { ChatWithOllamaModule } from './ai-agent/ollama-integration/chat-with-ollama/chat-with-ollama.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConnectOllamaModule,
    ChatWithOllamaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
