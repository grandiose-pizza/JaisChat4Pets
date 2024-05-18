export interface ChatOptions {
  selectedModel?: string;
  systemPrompt?: string;
  temperature?: number;
  language: string; // Required property to specify the language
}
