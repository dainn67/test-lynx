import { useNavigate } from 'react-router';
import '../GameStoreApp.css';

interface GameCardProps {
  title: string;
  image: string;
}

const GameCard = ({ title, image }: GameCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const gameId = title.toLowerCase().replace(/\s+/g, '-');
    console.log(gameId);
    navigate(`/chat/${gameId}`);
  };

  return (
    <view className="card" style={{ width: '150px' }}>
      <image src={image} className="card-image" bindtap={handleClick} />

      <text className="card-title">{title}</text>
    </view>
  );
};

export default GameCard;
