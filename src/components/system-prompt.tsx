"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { toast } from "sonner";
import { useDebounce } from "use-debounce";

import { useHasMounted } from "@/lib/utils";

// Updated ChatOptions type to include language and make systemPrompt and temperature optional
export interface ChatOptions {
  systemPrompt?: string; // Made systemPrompt optional to match chat-options.ts
  temperature?: number; // Made temperature optional to match chat-options.ts
  language: string; // Added language property
}

export interface SystemPromptProps {
  chatOptions: ChatOptions;
  setChatOptions: Dispatch<SetStateAction<ChatOptions>>;
}

export default function SystemPrompt({
  chatOptions,
  setChatOptions,
}: SystemPromptProps) {
  const hasMounted = useHasMounted();

  const systemPrompt = chatOptions ? chatOptions.systemPrompt : "";
  const [text, setText] = useState<string>(systemPrompt || "");
  const [debouncedText] = useDebounce(text, 500);

  useEffect(() => {
    if (!hasMounted) {
      return;
    }
    if (debouncedText !== systemPrompt) {
      setChatOptions({ ...chatOptions, systemPrompt: debouncedText });
      toast.success("System prompt updated", { duration: 1000 });
    }
  }, [hasMounted, debouncedText, systemPrompt, setChatOptions, chatOptions]); // Included chatOptions in the dependency array

  // System prompt component is removed as per user's request to hide it from the UI
  return null;
}
