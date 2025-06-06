import { Dimensions } from 'react-native';
import { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
export const ITEM_WIDTH = width * 0.7;

export const useAnimatedScroll = () => {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const useGetAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * ITEM_WIDTH,
        index * ITEM_WIDTH,
        (index + 1) * ITEM_WIDTH,
      ];

      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.85, 1.1, 0.85],
        'clamp'
      );

      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.4, 1, 0.4],
        'clamp'
      );

      return {
        transform: [{ scale }],
        opacity,
      };
    });
  };

  return { scrollHandler, useGetAnimatedStyle };
};
