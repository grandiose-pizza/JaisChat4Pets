"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { toast } from "sonner";
import { useDebounce } from "use-debounce";

import { useHasMounted } from "@/lib/utils";

// Updated ChatOptions type to include language and make systemPrompt optional
export interface ChatOptions {
  systemPrompt?: string; // Made systemPrompt optional to match chat-options.ts
  temperature: number;
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

  return (
    <div>
      <div className="justify-start gap-2 w-full rounded-sm px-2 text-xs">
        <p>System prompt</p>
      </div>

      <div className="m-2">
        <textarea
          className="resize-none bg-white/20 dark:bg-card/35"
          autoComplete="off"
          rows={7}
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.currentTarget.value)}
          name="systemPrompt"
          placeholder="You are a helpful assistant."
        />
      </div>
    </div>
  );
}
