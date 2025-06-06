import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface ErrorScreenProps {
  error?: Error | null;
  onRetry?: () => void;
  customMessage?: string;
}

const ErrorScreen = React.memo(({ 
  error, 
  onRetry,
  customMessage 
}: ErrorScreenProps) => (
  <View style={styles.container}>
    <Text style={styles.errorTitle}>¡Oops! Algo salió mal</Text>
    <Text style={styles.errorText}>
      {customMessage || `Error al cargar los datos: ${error?.message}`}
    </Text>
    {onRetry && (
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>Intentar de nuevo</Text>
      </TouchableOpacity>
    )}
  </View>
));

ErrorScreen.displayName = 'Error';

export default ErrorScreen;