import { Resumo } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

interface ResumoCardProps {
  resumo: Resumo;
}

export const ResumoCard: React.FC<ResumoCardProps> = ({ resumo }) => {
  const theme = useTheme();
  const saldoColor = resumo.saldoEstimado >= 0 ? '#4CAF50' : '#F44336';

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Text variant="titleLarge" style={styles.title}>
          Resumo do Mês
        </Text>

        <View style={styles.row}>
          <View style={styles.item}>
            <Text variant="bodySmall" style={styles.label}>
              Receita
            </Text>
            <Text variant="titleMedium" style={{ color: '#4CAF50' }}>
              {formatCurrency(resumo.totalRenda)}
            </Text>
          </View>

          <View style={styles.item}>
            <Text variant="bodySmall" style={styles.label}>
              Despesas
            </Text>
            <Text variant="titleMedium" style={{ color: '#F44336' }}>
              {formatCurrency(resumo.totalDespesas)}
            </Text>
          </View>
        </View>

        <View style={[styles.saldoContainer, { backgroundColor: `${saldoColor}15` }]}>
          <Text variant="bodyMedium" style={styles.saldoLabel}>
            Saldo Estimado
          </Text>
          <Text variant="headlineSmall" style={[styles.saldo, { color: saldoColor }]}>
            {formatCurrency(resumo.saldoEstimado)}
          </Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text variant="bodySmall" style={styles.statLabel}>
              Contas Pagas
            </Text>
            <Text variant="titleSmall">{resumo.contasPagas}</Text>
          </View>
          <View style={styles.stat}>
            <Text variant="bodySmall" style={styles.statLabel}>
              Contas Pendentes
            </Text>
            <Text variant="titleSmall">{resumo.contasPendentes}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginTop: 8,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  item: {
    flex: 1,
  },
  label: {
    opacity: 0.6,
    marginBottom: 4,
  },
  saldoContainer: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  saldoLabel: {
    opacity: 0.7,
    marginBottom: 4,
  },
  saldo: {
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    opacity: 0.6,
    marginBottom: 4,
  },
});
