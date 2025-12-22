import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Carregando...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text variant="bodyMedium" style={styles.text}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  text: {
    marginTop: 16,
    opacity: 0.6,
  },
});
