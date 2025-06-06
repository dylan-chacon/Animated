import { DetailScreenProps } from '@/navigation/types';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import styles from './styles';

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { item } = route.params;

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

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.contentContainer}>
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
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
