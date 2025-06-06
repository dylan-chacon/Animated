import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';

interface FooterLoaderProps {
  color?: string;
  size?: 'small' | 'large';
}

const FooterLoader = React.memo(({ 
  color = '#0000ff', 
  size = 'small' 
}: FooterLoaderProps) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
  </View>
));

FooterLoader.displayName = 'FooterLoader';

export default FooterLoader;