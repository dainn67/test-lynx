import { ChatbotProvider } from './ChatbotContext';
import { ChatInput } from './components/ChatInput';
import { ChatMessageBox } from './components/ChatMessageBox';
import { ChatHeader } from './components/ChatHeader';
import { useParams } from 'react-router';

export const ChatbotApp = () => {
  const { id } = useParams();

  return (
    <ChatbotProvider>
      <view
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: '#f5f5f5',
          fontFamily: 'Roboto, Arial, sans-serif',
        }}
      >
        <ChatHeader title={id} />
        <ChatMessageBox />
        <ChatInput />
      </view>
    </ChatbotProvider>
  );
};
