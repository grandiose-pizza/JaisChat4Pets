"use client";

import React, { useEffect, useState } from "react";

import { Sidebar } from "../sidebar";
import Chat, { ChatProps, ChatTopbarProps } from "./chat";
import { ChatOptions } from "../system-prompt";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  chatId: string;
  detectedLanguage?: 'en' | 'ar'; // Optional prop for detected language
}

type MergedProps = ChatLayoutProps & ChatProps & ChatTopbarProps & { chatOptions: ChatOptions; setChatOptions: React.Dispatch<React.SetStateAction<ChatOptions>>; };

export function ChatLayout({
  defaultLayout = [30, 160],
  defaultCollapsed = false,
  navCollapsedSize = 768,
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  error,
  stop,
  chatId,
  setChatId,
  chatOptions,
  setChatOptions,
  detectedLanguage, // Include detectedLanguage in the component props
}: MergedProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= navCollapsedSize);
      setIsCollapsed(window.innerWidth <= navCollapsedSize);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <div className={`relative z-0 flex h-full w-full overflow-hidden ${detectedLanguage === 'ar' ? 'rtl' : ''}`}> {/* Apply RTL styling conditionally */}
      <div className={`flex-shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary ${isMobile ? 'w-full' : 'md:w-[260px]'}`}>
        <Sidebar
          isCollapsed={isCollapsed}
          isMobile={isMobile}
          chatId={chatId}
          setChatId={setChatId}
          chatOptions={chatOptions}
          setChatOptions={setChatOptions}
        />
      </div>
      <div className={`relative flex h-full max-w-full flex-1 flex-col overflow-hidden ${isMobile ? 'w-full' : 'flex-grow'}`}>
        <Chat
          chatId={chatId}
          setChatId={setChatId}
          chatOptions={chatOptions}
          setChatOptions={setChatOptions}
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          stop={stop}
          detectedLanguage={detectedLanguage} // Pass detectedLanguage down to Chat component
        />
      </div>
    </div>
  );
}
