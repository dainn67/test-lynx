import { useCallback, useState } from '@lynx-js/react';
import { useChatbotContext } from '../ChatbotContext';

export const ChatInput = () => {
  const [inputText, setInputText] = useState('');
  const { addMessage } = useChatbotContext();

  const handleInputChange = useCallback(
    (event: any) => {
      // Check if Enter key was pressed
      if (event.detail.keyCode === 13 && inputText.trim()) {
        handleSendMessage();
      } else {
        setInputText(event.detail.value);
      }
    },
    [inputText],
  );

  const handleSendMessage = useCallback(() => {
    if (inputText.trim()) {
      setInputText('');
      addMessage(inputText, 'user');
    }
  }, [inputText, addMessage]);

  return (
    <view
      style={{
        display: 'flex',
        padding: '12px 16px',
        marginBottom: '16px',
        borderRadius: '12px',
        margin: '16px 16px 30px 16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        alignItems: 'center',
        position: 'sticky',
        bottom: 0,
      }}
    >
      <input
        value={inputText}
        bindinput={handleInputChange}
        placeholder="Type a message..."
        style={{
          flex: 1,
          height: '100%',
          fontSize: '16px',
          outline: 'none',
          border: 'none',
          padding: '12px 0',
        }}
      />
      <view
        bindtap={handleSendMessage}
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '23px',
          backgroundColor: '#6200ee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          marginLeft: '8px',
          transition: 'background-color 0.2s',
          boxShadow: '0 2px 4px rgba(98,0,238,0.3)',
        }}
      >
        <text
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          →
        </text>
      </view>
    </view>
  );
};
