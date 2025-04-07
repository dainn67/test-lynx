import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from '@lynx-js/react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  createdAt: string;
}

interface ChatbotContextType {
  messages: Message[];
  addMessage: (message: string, type: 'user' | 'bot') => void;
}

export const ChatbotContext = createContext<ChatbotContextType | undefined>(
  undefined,
);

export const ChatbotProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

  const addMessage = (message: string, type: 'user' | 'bot') => {
    const currentTime = new Date().getTime().toString();

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: currentTime,
        text: message,
        type,
        createdAt: currentTime,
      },
    ]);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: currentTime,
        text: 'Hello, how are you?',
        type: 'bot',
        createdAt: currentTime,
      },
    ]);
  };

  const value = {
    messages,
    addMessage,
  };

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
};

export const useChatbotContext = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbotContext must be used within a ChatbotProvider');
  }
  return context;
};
