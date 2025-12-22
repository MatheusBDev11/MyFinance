import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        {title}
      </Text>
      {description && (
        <Text variant="bodyMedium" style={styles.description}>
          {description}
        </Text>
      )}
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
  title: {
    textAlign: 'center',
    marginBottom: 8,
    opacity: 0.6,
  },
  description: {
    textAlign: 'center',
    opacity: 0.5,
  },
});
