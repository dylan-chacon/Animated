// src/components/Card.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import styles from './styles';

interface CardItem {
  image: string;
  title: string;
}

interface CardProps {
  item: CardItem;
  style?: ViewStyle;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({ item, style, onPress }) => {
  return (
    <Animated.View style={[styles.cardContainer, style]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Ver detalles</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Card;