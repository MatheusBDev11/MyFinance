import { formatCurrency } from '@/utils/formatters';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card as PaperCard, Text, useTheme } from 'react-native-paper';

interface TotalCardProps {
  title: string;
  value: number;
  icon?: string;
  color?: string;
  subtitle?: string;
}

export const TotalCard: React.FC<TotalCardProps> = ({ title, value, color, subtitle }) => {
  const theme = useTheme();
  const cardColor = color || theme.colors.primary;

  return (
    <PaperCard style={[styles.card, { borderLeftColor: cardColor }]} mode="elevated">
      <PaperCard.Content>
        <Text variant="labelMedium" style={styles.title}>
          {title}
        </Text>
        <Text variant="headlineMedium" style={[styles.value, { color: cardColor }]}>
          {formatCurrency(value)}
        </Text>
        {subtitle && (
          <Text variant="bodySmall" style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </PaperCard.Content>
    </PaperCard>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderLeftWidth: 4,
  },
  title: {
    opacity: 0.7,
    marginBottom: 4,
  },
  value: {
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.6,
  },
});
