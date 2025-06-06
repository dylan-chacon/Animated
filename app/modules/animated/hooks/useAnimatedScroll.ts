import { Dimensions } from 'react-native';
import { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
export const ITEM_WIDTH = width * 0.7;

export const useAnimatedScroll = () => {
  const scrollX = useSharedValue(0);

  // useAnimatedScrollHandler es la forma moderna y performante de manejar eventos de scroll
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const useGetAnimatedStyle = (index: number) => {
    // useAnimatedStyle se ejecuta en el hilo de UI, garantizando animaciones fluidas
    return useAnimatedStyle(() => {
      // Definimos el rango de entrada basado en la posición del ítem
      const inputRange = [
        (index - 1) * ITEM_WIDTH,
        index * ITEM_WIDTH,
        (index + 1) * ITEM_WIDTH,
      ];

      // El ítem en el centro estará a escala 1.1, los demás más pequeños
      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.85, 1.1, 0.85],
        'clamp' // 'clamp' asegura que los valores no se salgan del rango de salida
      );

      // El ítem en el centro tendrá opacidad 1, los demás serán más transparentes
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
