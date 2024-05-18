import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatLayout } from '@/components/chat/chat-layout';
import { ChatOptions } from '@/components/system-prompt';
import { basePath } from '@/lib/utils';
import { useChat } from 'ai/react';
import { toast } from 'sonner';
import useLocalStorageState from 'use-local-storage-state';
import { detectLanguage } from '@/utils/language-detection'; // Importing the detectLanguage function

interface ChatPageProps {
  chatId: string;
  setChatId: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChatPage({ chatId, setChatId }: ChatPageProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    stop,
    setMessages,
  } = useChat({
    api: basePath + '/api/chat',
    streamMode: 'text',
    onError: (error) => {
      toast.error('Something went wrong: ' + error);
    },
  });

  // Define the type for the system prompts keys
  type LanguageCode = 'en' | 'ar';

  // Memoize the default system prompts to prevent them from being recreated on every render
  const defaultSystemPrompts = React.useMemo<{ [key in LanguageCode]: string }>(() => ({
    en: "You are 'JaisDonnie - Woof!!' and are built by Core42, UAE. You will serve as a knowledgeable assistant for dog and cat owners, providing reliable information and advice on various aspects of pet care. This includes nutrition, medication, habits, training, insurance, and financial costs of maintaining pets. You should be well-informed about both dogs and cats, capable of handling a wide range of questions, and offer helpful and practical tips. You should also be sensitive to the emotional aspects of pet ownership, offering compassionate and understanding responses.",
    ar: "أنت 'JaisDonnie - Woof!!' وتم بناؤها بواسطة Core42، الإمارات العربية المتحدة. ستعمل كمساعد واسع المعرفة لأصحاب الكلاب والقطط، حيث تقدم معلومات ونصائح موثوقة حول الجوانب المختلفة لرعاية الحيوانات الأليفة. وهذا يشمل التغذية والأدوية والعادات والتدريب والتأمين والتكاليف المالية للحفاظ على الحيوانات الأليفة. يجب أن تكون على دراية جيدة بكل من الكلاب والقطط، وأن تكون قادرًا على التعامل مع مجموعة واسعة من الأسئلة، وتقديم نصائح مفيدة وعملية. يجب أيضًا أن تكون حساسًا للجوانب العاطفية لملكية الحيوانات الأليفة، وأن تقدم استجابات رحيمة ومتفهمة."
  }), []);

  const [chatOptions, setChatOptions] = useLocalStorageState<ChatOptions>('chatOptions', {
    defaultValue: {
      systemPrompt: defaultSystemPrompts['en'], // Set default system prompt for English
      temperature: 0.9,
      language: 'en', // Default language set to English
    },
  });

  React.useEffect(() => {
    // Update systemPrompt based on language selection
    const updatedSystemPrompt = defaultSystemPrompts[chatOptions.language as LanguageCode];
    setChatOptions(prevOptions => ({ ...prevOptions, systemPrompt: updatedSystemPrompt }));
  }, [chatOptions.language, setChatOptions, defaultSystemPrompts]); // Include defaultSystemPrompts in the dependency array

  React.useEffect(() => {
    if (chatId) {
      const item = localStorage.getItem(`chat_${chatId}`);
      if (item) {
        setMessages(JSON.parse(item));
      }
    } else {
      setMessages([]);
    }
  }, [setMessages, chatId]);

  React.useEffect(() => {
    if (!isLoading && !error && chatId && messages.length > 0) {
      // Save messages to local storage
      localStorage.setItem(`chat_${chatId}`, JSON.stringify(messages));
      // Trigger the storage event to update the sidebar component
      window.dispatchEvent(new Event('storage'));
    }
  }, [messages, chatId, isLoading, error]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (messages.length === 0) {
      // Generate a random id for the chat
      const id = uuidv4();
      setChatId(id);
    }

    // Detect the language of the input and update the system prompt accordingly
    const inputLanguage = detectLanguage(input);
    const lastMessageLanguage = messages.length > 0 ? detectLanguage(messages[messages.length - 1].content) : 'en';
    // Determine the language for the system prompt based on the input and last message
    const systemPromptLanguage = inputLanguage === 'ar' || lastMessageLanguage === 'ar' ? 'ar' : 'en';
    const updatedSystemPrompt = defaultSystemPrompts[systemPromptLanguage as LanguageCode];
    const isResponseRTL = lastMessageLanguage === 'ar'; // Determine if the response should be RTL

    // Prepare the options object with additional body data, to pass the model.
    const requestOptions = {
      options: {
        body: {
          chatOptions: {
            ...chatOptions,
            systemPrompt: updatedSystemPrompt, // Update the system prompt based on detected language
          },
        },
      },
    };

    // Call the handleSubmit function with the options
    handleSubmit(e, requestOptions);
  };

  // Use the language of the last message to determine the direction for the response pane
  const lastMessageLanguage = messages.length > 0 ? detectLanguage(messages[messages.length - 1].content) : 'en';
  const isResponseRTL = lastMessageLanguage === 'ar'; // Determine if the response should be RTL based on the last message

  return (
    <main className={`flex h-[calc(100dvh)] flex-col items-center ${isResponseRTL ? 'rtl' : ''}`}>
      <ChatLayout
        chatId={chatId}
        setChatId={setChatId}
        chatOptions={chatOptions}
        setChatOptions={setChatOptions as React.Dispatch<React.SetStateAction<ChatOptions>>}
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={onSubmit}
        isLoading={isLoading}
        error={error}
        stop={stop}
        navCollapsedSize={10}
        defaultLayout={[30, 160]}
        detectedLanguage={lastMessageLanguage} // Pass the detected language to ChatLayout
      />
    </main>
  );
}
