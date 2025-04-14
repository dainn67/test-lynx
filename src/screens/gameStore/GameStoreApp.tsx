import GameCategory from './components/GameCategory';
import './GameStoreApp.css';

export const GameStoreApp = () => {
  return (
    <scroll-view
      className="scroll-view-container"
      scroll-orientation="vertical"
    >
      <view className="scroll-view-content">
        <GameCategory title="Action" image="https://images.mubicdn.net/images/cast_member/34836/cache-597973-1602713164/image-w856.jpg" />
        <GameCategory title="Adventure" image="https://images.mubicdn.net/images/cast_member/34836/cache-597973-1602713164/image-w856.jpg" />
        <GameCategory title="RPG" image="https://images.mubicdn.net/images/cast_member/34836/cache-597973-1602713164/image-w856.jpg" />
        <GameCategory title="Strategy" image="https://images.mubicdn.net/images/cast_member/34836/cache-597973-1602713164/image-w856.jpg" />
      </view>
    </scroll-view>
  );
};
