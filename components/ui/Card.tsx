import React from 'react';
import { StyleSheet } from 'react-native';
import { Card as PaperCard, useTheme } from 'react-native-paper';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
}

export const Card: React.FC<CardProps> = ({ children, onPress, style }) => {
  const theme = useTheme();

  return (
    <PaperCard
      style={[styles.card, { backgroundColor: theme.colors.surface }, style]}
      onPress={onPress}
      mode="elevated"
    >
      {children}
    </PaperCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
});
