import { useChatbotContext } from '../ChatbotContext';
import { useEffect, useRef } from 'react';

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
      <view
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflow: 'auto',
        }}
      >
        {messages.map(({ id, type, text, createdAt }, index) => {
          const isUser = type === 'user';

          return (
            <view
              key={id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                maxWidth: '80%',
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                flexDirection: isUser ? 'row-reverse' : 'row',
              }}
            >
              <view
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  flexShrink: 0,
                  backgroundColor: isUser ? '#ff4081' : '#6200ee',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              >
                <text
                  style={{
                    color: 'white',
                    fontSize: '12px',
                  }}
                >
                  {isUser ? 'Y' : 'B'}
                </text>
              </view>
              <view
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <view
                  style={{
                    padding: '12px 16px',
                    borderRadius: '18px',
                    maxWidth: '100%',
                    wordBreak: 'break-all',
                    backgroundColor: isUser ? '#6200ee' : '#f5f5f5',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    borderTopRightRadius: isUser ? '4px' : '18px',
                    borderTopLeftRadius: isUser ? '18px' : '4px',
                  }}
                >
                  <text
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.4',
                      color: isUser ? 'white' : '#333',
                    }}
                  >
                    {text}
                  </text>
                </view>
              </view>
            </view>
          );
        })}
      </view>
    </view>
  );
};
