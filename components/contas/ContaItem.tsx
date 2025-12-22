import { getCategoriaInfo } from '@/constants/categorias';
import { Conta } from '@/types';
import { formatCurrency, isDuesSoon, isOverdue } from '@/utils/formatters';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Chip, IconButton, Text, useTheme } from 'react-native-paper';

interface ContaItemProps {
  conta: Conta;
  onPress: () => void;
  onTogglePagamento: () => void;
  onDelete: () => void;
}

export const ContaItem: React.FC<ContaItemProps> = ({
  conta,
  onPress,
  onTogglePagamento,
  onDelete,
}) => {
  const theme = useTheme();
  const categoria = getCategoriaInfo(conta.categoria);
  
  const isPaga = conta.status === 'paga';
  const venceSoon = isDuesSoon(conta.vencimento, conta.status);
  const vencida = isOverdue(conta.vencimento, conta.status);

  const getStatusColor = () => {
    if (isPaga) return '#4CAF50';
    if (vencida) return '#F44336';
    if (venceSoon) return '#FF9800';
    return theme.colors.onSurface;
  };

  return (
    <Card style={styles.card} onPress={onPress} mode="elevated">
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={[styles.iconContainer, { backgroundColor: categoria.color + '20' }]}>
              <Text style={{ fontSize: 20 }}>{categoria.icon}</Text>
            </View>
            <View style={styles.info}>
              <Text variant="titleMedium" style={styles.nome}>
                {conta.nome}
              </Text>
              <Text variant="bodySmall" style={styles.categoria}>
                {categoria.label}
              </Text>
            </View>
          </View>
          <View style={styles.actions}>
            <IconButton
              icon={isPaga ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
              iconColor={getStatusColor()}
              size={24}
              onPress={onTogglePagamento}
            />
            <IconButton icon="delete" iconColor="#F44336" size={20} onPress={onDelete} />
          </View>
        </View>

        <View style={styles.footer}>
          <View>
            <Text variant="bodySmall" style={styles.label}>
              Valor
            </Text>
            <Text variant="titleMedium" style={[styles.valor, { color: getStatusColor() }]}>
              {formatCurrency(conta.valor)}
            </Text>
          </View>

          <View>
            <Text variant="bodySmall" style={styles.label}>
              Vencimento
            </Text>
            <Text variant="bodyMedium">Dia {conta.vencimento}</Text>
          </View>

          <Chip
            mode="flat"
            style={[styles.chip, { backgroundColor: getStatusColor() + '20' }]}
            textStyle={{ color: getStatusColor(), fontSize: 12 }}
          >
            {isPaga ? 'Paga' : vencida ? 'Vencida' : venceSoon ? 'Vence em breve' : 'Pendente'}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontWeight: '600',
  },
  categoria: {
    opacity: 0.6,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  label: {
    opacity: 0.6,
    marginBottom: 2,
  },
  valor: {
    fontWeight: 'bold',
  },
  chip: {
    height: 28,
  },
});
