import BackButton from '../../../components/BackButtons';

export const ChatHeader = ({ title }: { title: string | undefined }) => {
  return (
    <view
      style={{
        padding: '60px 16px 16px 16px',
        backgroundColor: '#6200ee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <BackButton />
      <text
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          letterSpacing: '0.5px',
          color: 'white',
        }}
      >
        {title ? title : 'Chatbot'}
      </text>
      <view
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <text
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          •••
        </text>
      </view>
    </view>
  );
};
