"use client";

import ClearChatsButton from "./settings-clear-chats";
import SettingsThemeToggle from "./settings-theme-toggle";
import SystemPrompt, { SystemPromptProps, ChatOptions } from "./system-prompt";
import { Input } from "./ui/input";

type ChatOptionsType = ChatOptions;

interface LanguageToggleProps {
  chatOptions: ChatOptionsType;
  setChatOptions: React.Dispatch<React.SetStateAction<ChatOptionsType>>;
}

const TemperatureSlider = ({
  chatOptions,
  setChatOptions,
}: SystemPromptProps) => {
  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatOptions({ ...chatOptions, temperature: parseFloat(e.target.value) });
  };

  return (
    <div>
      <div className="mx-2 flex align-middle gap-4 items-center justify-between">
        <label
          htmlFor="small-input"
          className="text-xs font-medium text-gray-900 dark:text-white align-middle"
        >
          Temperature
        </label>
        <Input
          type="text"
          id="small-input"
          className="w-1/4 text-gray-900 hover:border hover:border-gray-300 rounded-sm hover:bg-gray-200 text-xs focus:ring-blue-500 focus:border-blue-500 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-6
          text-right
          "
          value={chatOptions.temperature}
          onChange={handleTemperatureChange}
          min={0}
          max={1}
          step={0.05}
        />
      </div>

      <div className="p-2">
        <input
          id="labels-range-input"
          type="range"
          value={chatOptions.temperature}
          onChange={handleTemperatureChange}
          min="0.0"
          max="1.0"
          step="0.05"
          className="w-full h-1 bg-gray-200 rounded-sm appearance-none cursor-pointer range-sm dark:bg-gray-700"
        />
      </div>
    </div>
  );
};

// Language toggle component is removed as per user's request to hide it from the UI

export default function Settings({
  chatOptions,
  setChatOptions,
}: SystemPromptProps) {
  return (
    <>
      <SystemPrompt chatOptions={chatOptions} setChatOptions={setChatOptions} />
      <TemperatureSlider
        chatOptions={chatOptions}
        setChatOptions={setChatOptions}
      />
      {/* <LanguageToggle chatOptions={chatOptions} setChatOptions={setChatOptions} /> */}
      <SettingsThemeToggle />
      <ClearChatsButton />
    </>
  );
}
