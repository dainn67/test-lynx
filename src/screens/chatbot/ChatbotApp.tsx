import { ChatbotProvider } from './ChatbotContext';
import { ChatInput } from './components/ChatInput';
import { ChatMessageBox } from './components/ChatMessageBox';
import { ChatHeader } from './components/ChatHeader';

export const ChatbotApp = () => {
  return (
    <ChatbotProvider>
      <view
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: '#f5f5f5',
          fontFamily: 'Roboto, Arial, sans-serif',
        }}
      >
        <ChatHeader />
        <ChatMessageBox />
        <ChatInput />
      </view>
    </ChatbotProvider>
  );
};
