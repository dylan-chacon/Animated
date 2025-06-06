import React from 'react';
import { View, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useAnimatedScroll } from '../../hooks/useAnimatedScroll';
import { AnimatedListScreenProps, RootStackParamList } from '@/navigation/types';
import type { StackNavigationProp } from '@react-navigation/stack';
import Card from '@/components/Card/Card';
import styles from './styles';

const MOCK_DATA: any[] = [];
const { width } = Dimensions.get('window');
export const ITEM_WIDTH = width * 0.7;

const AnimatedFlatList = Animated.FlatList;
interface Item {
  id: string;
  image: string;
  title: string;
}

const AnimatedListScreen: React.FC<AnimatedListScreenProps> = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { scrollHandler, useGetAnimatedStyle } = useAnimatedScroll();
  
  const RenderItem = ({ item, index }: { item: Item, index: number }) => {
    const animatedCardStyle = useGetAnimatedStyle(index);
    return (
      <Card
        item={item}
        style={animatedCardStyle}
        onPress={() => navigation.navigate('Details', { item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={MOCK_DATA}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        snapToInterval={ITEM_WIDTH + 20}
        decelerationRate="fast"
        contentContainerStyle={[styles.listContent, { paddingHorizontal: (width - ITEM_WIDTH - 20) / 2 }]}
      />
    </View>
  );
};

export default AnimatedListScreen;