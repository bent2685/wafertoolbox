export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content?: string; // Fallback for string content
  contentBlocks?: ContentBlock[]; // Structured content blocks
  timestamp?: string;
}

export interface ToolCall {
  type: string;
  id: string;
  input: Record<string, unknown>;
  displayName: string;
  icon: string;
}

export interface ToolResult {
  toolUseId: string;
  content: string;
  isError: boolean;
}

export interface ContentBlock {
  type: 'text' | 'tool_call' | 'tool_result' | 'system_context';
  text?: string;
  toolCall?: ToolCall;
  toolResult?: ToolResult;
}

export interface ChatSession {
  sessionId: string;
  messages: ChatMessage[];
  isLoading: boolean;
  error?: Error;
}
