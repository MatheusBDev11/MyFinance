import { getCategoriaInfo } from '@/constants/categorias';
import { Conta } from '@/types';
import { formatCurrency, isDuesSoon, isOverdue } from '@/utils/formatters';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

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
    if (vencida) return '#E53935';
    if (venceSoon) return '#FF9800';
    return '#0D47A1';
  };

  const getBackgroundColor = () => {
    if (isPaga) return '#F1F8F4';
    if (vencida) return '#FFEBEE';
    return '#FFFFFF';
  };

  return (
    <Pressable 
      onPress={onPress}
      onLongPress={onDelete}
      style={[styles.card, { backgroundColor: getBackgroundColor() }]}
    >
      {/* Status indicator */}
      <View style={[styles.statusBar, { backgroundColor: getStatusColor() }]} />
      
      {/* Header com ícone */}
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: categoria.color + '15' }]}>
          <Text style={styles.iconText}>{categoria.icon}</Text>
        </View>
        <Pressable onPress={onTogglePagamento} hitSlop={8}>
          <IconButton
            icon={isPaga ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
            iconColor={getStatusColor()}
            size={20}
            style={styles.checkButton}
          />
        </Pressable>
      </View>

      {/* Nome da conta */}
      <Text variant="titleMedium" style={styles.nome} numberOfLines={1}>
        {conta.nome}
      </Text>
      
      {/* Valor */}
      <Text variant="headlineSmall" style={[styles.valor, { color: getStatusColor() }]}>
        {formatCurrency(conta.valor)}
      </Text>

      {/* Footer com vencimento */}
      <View style={styles.footer}>
        <Text variant="bodySmall" style={styles.vencimento}>
          Dia {conta.vencimento}
        </Text>
        <Text variant="labelSmall" style={[styles.status, { color: getStatusColor() }]}>
          {isPaga ? '✓ Paga' : vencida ? '! Vencida' : venceSoon ? '⚠ Vence em breve' : 'Pendente'}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    margin: 6,
    minHeight: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  checkButton: {
    margin: 0,
  },
  nome: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#1A1C1E',
  },
  valor: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  footer: {
    marginTop: 'auto',
  },
  vencimento: {
    opacity: 0.6,
    marginBottom: 4,
  },
  status: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
