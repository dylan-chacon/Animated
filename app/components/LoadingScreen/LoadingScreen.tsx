import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import styles from './styles';

interface LoadingScreenProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

const LoadingScreen = React.memo(({ 
  message = 'Cargando personajes...', 
  size = 'large',
  color = '#0000ff'
}: LoadingScreenProps) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
    <Text style={styles.loadingText}>{message}</Text>
  </View>
));

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;