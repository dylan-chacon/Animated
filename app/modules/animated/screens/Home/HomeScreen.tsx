import { AnimatedListScreenProps, RootStackParamList } from '@/navigation/types';
import { Character } from '@/types/data';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import Animated from 'react-native-reanimated';
import RenderItem, { CardItem } from '@/app/components/RenderItem/RenderItem';
import FooterLoader from '@/app/components/FooterLoader/FooterLoader';
import LoadingScreen from '@/app/components/LoadingScreen/LoadingScreen';
import ErrorScreen from '@/app/components/ErrorScreen/ErrorScreen';
import { useAnimatedScroll } from '../../hooks/useAnimatedScroll';
import { useFetchCharacters } from '../../hooks/useFetchCharacters';
import { useCharacterStore } from '../../store/useCharacterStore';
import styles from './styles';

const { width } = Dimensions.get('window');
export const ITEM_WIDTH = width * 0.7;
const ITEM_SPACING = 20;
const SIDE_PADDING = (width - ITEM_WIDTH - ITEM_SPACING) / 2;

const AnimatedFlatList = Animated.FlatList;

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

  const cardItems: CardItem[] = useMemo(() => 
    characters.map((character) => ({
      id: character.id.toString(),
      image: character.image,
      title: character.name,
      character: character
    })), [characters]
  );

  const contentContainerStyle = useMemo(() => [
    styles.listContent, 
    { 
      paddingLeft: SIDE_PADDING,
      paddingRight: SIDE_PADDING
    }
  ], []);

  const handleItemPress = useCallback((character: Character) => {
    navigation.navigate('Details', { item: character });
  }, [navigation]);

  const renderItem = useCallback(({ item, index }: { item: CardItem, index: number }) => {
    return (
      <RenderItem
        item={item}
        index={index}
        onPress={() => handleItemPress(item.character)}
        useGetAnimatedStyle={useGetAnimatedStyle}
      />
    );
  }, [handleItemPress, useGetAnimatedStyle]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [hasNextPage, isLoading, fetchNextPage]);

  const keyExtractor = useCallback((item: CardItem) => item.id, []);

  const listFooterComponent = useMemo(() => 
    isLoading ? <FooterLoader /> : null, 
    [isLoading]
  );

  if (isLoading && characters.length === 0) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen error={error} />;
  }

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={cardItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        snapToAlignment="start"
        contentContainerStyle={contentContainerStyle}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={listFooterComponent}
        removeClippedSubviews
        maxToRenderPerBatch={5}
        windowSize={10}
        initialNumToRender={3}
        updateCellsBatchingPeriod={50}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH + ITEM_SPACING,
          offset: (ITEM_WIDTH + ITEM_SPACING) * index,
          index,
        })}
      />
    </View>
  );
};

export default React.memo(AnimatedListScreen);