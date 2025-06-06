import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import { DetailScreenProps } from '@/navigation/types';

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>Detalles de: {item.title}</Text>
      <Text style={styles.text}>ID del Ítem: {item.id}</Text>
    </View>
  );
};

export default DetailScreen;
