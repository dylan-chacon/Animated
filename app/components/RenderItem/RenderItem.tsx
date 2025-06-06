import Card from '@/components/Card/Card';
import { Character } from '@/types/data';
import React from 'react';

interface CardItem {
  id: string;
  image: string;
  title: string;
  character: Character;
}

interface RenderItemProps {
  item: CardItem;
  index: number;
  onPress: () => void;
  useGetAnimatedStyle: (index: number) => any;
}

const RenderItem = React.memo(({ 
  item, 
  index, 
  onPress, 
  useGetAnimatedStyle 
}: RenderItemProps) => {
  const animatedCardStyle = useGetAnimatedStyle(index);
  
  return (
    <Card
      item={item}
      style={animatedCardStyle}
      onPress={onPress}
    />
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.index === nextProps.index &&
    prevProps.item.image === nextProps.item.image &&
    prevProps.item.title === nextProps.item.title
  );
});

RenderItem.displayName = 'RenderItem';

export default RenderItem;
export type { CardItem };
