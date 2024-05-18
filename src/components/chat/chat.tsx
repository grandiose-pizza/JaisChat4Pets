import React from "react";

import { ChatRequestOptions } from "ai";
import { Message } from "ai/react";

import ChatBottombar from "./chat-bottombar";
import ChatList from "./chat-list";
import { ChatOptions } from "./chat-options";
import ChatTopbar from "./chat-topbar";

export interface ChatProps {
  chatId?: string;
  setChatId: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  isLoading: boolean;
  error: undefined | Error;
  stop: () => void;
  detectedLanguage?: 'en' | 'ar'; // Optional prop for detected language
}

export interface ChatTopbarProps {
  chatOptions: ChatOptions;
  setChatOptions: React.Dispatch<React.SetStateAction<ChatOptions>>;
}

export default function Chat({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  error,
  stop,
  chatOptions,
  setChatOptions,
  chatId,
  setChatId,
  detectedLanguage, // Include detectedLanguage in the component props
}: ChatProps & ChatTopbarProps) {
  return (
    <div className={`flex flex-col justify-between w-full h-full ${detectedLanguage === 'ar' ? 'rtl' : ''}`}> {/* Apply RTL styling conditionally */}
      <ChatTopbar
        chatOptions={chatOptions}
        setChatOptions={setChatOptions}
        isLoading={isLoading}
        chatId={chatId}
        setChatId={setChatId}
        messages={messages}
        detectedLanguage={detectedLanguage} // Pass detectedLanguage down to ChatTopbar component
      />

      <ChatList
        messages={messages}
        isLoading={isLoading}
        detectedLanguage={detectedLanguage} // Pass detectedLanguage down to ChatList component
      />

      <ChatBottombar
        selectedModel={chatOptions.selectedModel}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
        detectedLanguage={detectedLanguage} // Pass detectedLanguage down to ChatBottombar component
      />
    </div>
  );
}
