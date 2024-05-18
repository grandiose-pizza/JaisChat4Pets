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
          max={2}
          step={0.1}
        />
      </div>

      <div className="p-2">
        <input
          id="labels-range-input"
          type="range"
          value={chatOptions.temperature}
          onChange={handleTemperatureChange}
          min="0.0"
          max="2.0"
          step="0.1"
          className="w-full h-1 bg-gray-200 rounded-sm appearance-none cursor-pointer range-sm dark:bg-gray-700"
        />
      </div>
    </div>
  );
};

// Language toggle component
const LanguageToggle = ({
  chatOptions,
  setChatOptions,
}: LanguageToggleProps) => {
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const isRtl = newLang === 'ar';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    setChatOptions({ ...chatOptions, language: newLang });
  };

  return (
    <div className="mx-2 flex align-middle gap-4 items-center justify-between">
      <label
        htmlFor="language-select"
        className="text-xs font-medium text-gray-900 dark:text-white align-middle"
      >
        Language
      </label>
      <select
        id="language-select"
        className="w-1/4 text-gray-900 hover:border hover:border-gray-300 rounded-sm hover:bg-gray-200 text-xs focus:ring-blue-500 focus:border-blue-500 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-6"
        value={chatOptions.language}
        onChange={handleLanguageChange}
      >
        <option value="en">En</option>
        <option value="ar">Ar</option>
      </select>
    </div>
  );
};

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
      <LanguageToggle chatOptions={chatOptions} setChatOptions={setChatOptions} />
      <SettingsThemeToggle />
      <ClearChatsButton />
    </>
  );
}
