export interface OllamaConnectionConfig {
  baseUrl: string;
  model: string;
  timeout: number;
}

export interface OllamaResponse {
  success: boolean;
  data?: any;
  error?: string;
  model?: string;
  responseTime?: number;
}

export interface OllamaHealthStatus {
  isConnected: boolean;
  model: string;
  version?: string;
  lastCheck: Date;
}
