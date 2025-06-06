import { DetailScreenProps } from '@/navigation/types';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  Image,
  ScrollView,
  Text,
  View
} from 'react-native';
import styles from './styles';

const { width } = Dimensions.get('window');

const DetailScreen: React.FC<DetailScreenProps> = ({ route, navigation }) => {
  const { item } = route.params;

  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const imageSlideAnim = useRef(new Animated.Value(-200)).current;
  const contentSlideAnim = useRef(new Animated.Value(50)).current;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive':
        return '#4CAF50';
      case 'Dead':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const entranceAnimation = Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]);

    const contentAnimation = Animated.sequence([
      Animated.timing(imageSlideAnim, {
        toValue: 0,
        duration: 400,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(contentSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]);

    entranceAnimation.start();
    contentAnimation.start();
  }, [contentSlideAnim, fadeAnim, imageSlideAnim, scaleAnim, slideAnim]);

  const handleGoBack = () => {
    const exitAnimation = Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 250,
        useNativeDriver: true,
      }),
    ]);

    exitAnimation.start(() => {
      navigation.goBack();
    });
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleGoBack();
      return true;
    });

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation]);

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [
            { translateX: slideAnim },
            { scale: scaleAnim }
          ],
          opacity: fadeAnim,
        }
      ]}
    >
      <ScrollView>
        <Animated.View
          style={{
            transform: [{ translateY: imageSlideAnim }]
          }}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.contentContainer,
            {
              transform: [{ translateY: contentSlideAnim }]
            }
          ]}
        >
          <Text style={styles.name}>{item.name}</Text>
          
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
            <Text style={styles.status}>{item.status}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Información Básica</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>ID:</Text>
              <Text style={styles.value}>{item.id}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Especie:</Text>
              <Text style={styles.value}>{item.species}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Tipo:</Text>
              <Text style={styles.value}>{item.type || 'N/A'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Género:</Text>
              <Text style={styles.value}>{item.gender}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Ubicación</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Origen:</Text>
              <Text style={styles.value}>{item.origin.name}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Ubicación actual:</Text>
              <Text style={styles.value}>{item.location.name}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Episodios</Text>
            <Text style={styles.episodeCount}>
              Aparece en {item.episode.length} episodio(s)
            </Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Información adicional</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Creado:</Text>
              <Text style={styles.value}>{formatDate(item.created)}</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </Animated.View>
  );
};

export default DetailScreen;
