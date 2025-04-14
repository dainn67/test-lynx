import GameCard from './GameCard';
import '../GameStoreApp.css';

interface GameCategoryProps {
  title: string;
  image: string;
}


const GameCategory = ({ title, image }: GameCategoryProps) => {
  return (
    <view className="game-category">
      <text>Game Categories</text>
      <list
        className="game-category-list"
        scroll-orientation="horizontal"
        list-type="single"
        span-count={1}
        style={{
          width: '100%',
          padding: '10px',
          listMainAxisGap: '5px',
        }}
      >
        {Array.from({ length: 5 }).map((item, index) => {
          return (
            <list-item
              item-key={`list-item-${index}`}
              key={`list-item-${index}`}
            >
              <GameCard title={title} image={image} />
            </list-item>
          );
        })}
      </list>
    </view>
  );
};

export default GameCategory;
