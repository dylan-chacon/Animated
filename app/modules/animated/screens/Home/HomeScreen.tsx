import Card from '@/components/Card/Card';
import { AnimatedListScreenProps, RootStackParamList } from '@/navigation/types';
import { Character } from '@/types/data';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useAnimatedScroll } from '../../hooks/useAnimatedScroll';
import { useFetchCharacters } from '../../hooks/useFetchCharacters';
import { useCharacterStore } from '../../store/useCharacterStore';
import styles from './styles';

const { width } = Dimensions.get('window');
export const ITEM_WIDTH = width * 0.7;

const AnimatedFlatList = Animated.FlatList;

interface CardItem {
  id: string;
  image: string;
  title: string;
  character: Character;
}

const RenderItem = React.memo(({ 
  item, 
  index, 
  onPress, 
  useGetAnimatedStyle 
}: { 
  item: CardItem;
  index: number;
  onPress: () => void;
  useGetAnimatedStyle: (index: number) => any;
}) => {
  const animatedCardStyle = useGetAnimatedStyle(index);
  
  return (
    <Card
      item={item}
      style={animatedCardStyle}
      onPress={onPress}
    />
  );
});

RenderItem.displayName = 'RenderItem';

const AnimatedListScreen: React.FC<AnimatedListScreenProps> = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { scrollHandler, useGetAnimatedStyle } = useAnimatedScroll();

  const characters = useCharacterStore((state) => state.characters);
  const {
    fetchNextPage, 
    hasNextPage, 
    isLoading, 
    isError, 
    error 
  } = useFetchCharacters();

  const cardItems: CardItem[] = characters.map((character) => ({
    id: character.id.toString(),
    image: character.image,
    title: character.name,
    character: character
  }));

  const renderItem = useCallback(({ item, index }: { item: CardItem, index: number }) => {
    return (
      <RenderItem
        item={item}
        index={index}
        onPress={() => navigation.navigate('Details', { item: item.character })}
        useGetAnimatedStyle={useGetAnimatedStyle}
      />
    );
  }, [navigation, useGetAnimatedStyle]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [hasNextPage, isLoading, fetchNextPage]);

  if (isLoading && characters.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando personajes...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>
          Error al cargar los datos: {error?.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={cardItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        snapToInterval={ITEM_WIDTH + 20}
        decelerationRate="fast"
        contentContainerStyle={[styles.listContent, { paddingHorizontal: (width - ITEM_WIDTH - 20) / 2 }]}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default AnimatedListScreen;