import { useChatbotContext } from '../ChatbotContext';
import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';

export const ChatMessageBox = () => {
  const { messages } = useChatbotContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <view
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        margin: '8px 16px',
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      }}
    >
      <view
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <text
          style={{
            padding: '4px 12px',
            borderRadius: '16px',
            backgroundColor: 'rgba(98, 0, 238, 0.08)',
            color: '#6200ee',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          {messages.length} messages
        </text>
      </view>

      <scroll-view
        scroll-orientation="vertical"
        style={{
          width: '100%',
          height: '100%',
          paddingLeft: '5px',
          marginLeft: '5px',
        }}
      >
        {messages.map(({ id, type, text }) => {
          return <ChatMessage key={id} id={id} type={type} text={text} />;
        })}
      </scroll-view>

      {/* <view
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflow: 'auto',
        }}
      >
        
      </view> */}
    </view>
  );
};
