import { useNavigate } from 'react-router';

const BackButton = () => {
  const navigate = useNavigate();

  return (
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
      bindtap={() => navigate(-1)}
    >
      <text
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        ←
      </text>
    </view>
  );
};

export default BackButton;
