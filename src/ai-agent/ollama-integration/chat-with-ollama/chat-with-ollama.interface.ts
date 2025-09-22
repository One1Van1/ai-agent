export interface ChatRequest {
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatResponse {
  success: boolean;
  data?: string;
  error?: string;
  metadata?: {
    model: string;
    responseTime: number;
    tokensUsed?: number;
  };
}
