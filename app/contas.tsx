import { ContaItem } from '@/components/contas/ContaItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { useContas } from '@/hooks/useContas';
import { StatusConta } from '@/types';
import { formatMonth, getCurrentMonth } from '@/utils/formatters';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Chip, FAB, Searchbar, SegmentedButtons, Text } from 'react-native-paper';

export default function ContasScreen() {
  const router = useRouter();
  const [mes] = useState(getCurrentMonth());
  const { contasDoMes, loading, deleteConta, togglePagamento, filterContas } = useContas(mes);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusConta | 'todas'>('todas');

  const handleDelete = (id: string, nome: string) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir a conta "${nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteConta(id);
          },
        },
      ]
    );
  };

  const handleTogglePagamento = async (id: string, currentStatus: StatusConta) => {
    const newStatus = currentStatus === 'paga' ? 'pendente' : 'paga';
    await togglePagamento(id, newStatus);
  };

  const contasFiltradas = filterContas({
    mes,
    status: statusFilter,
    busca: searchQuery,
  });

  // Ordenar: pendentes primeiro, depois vencimento
  const contasOrdenadas = [...contasFiltradas].sort((a, b) => {
    if (a.status === 'pendente' && b.status === 'paga') return -1;
    if (a.status === 'paga' && b.status === 'pendente') return 1;
    return a.vencimento - b.vencimento;
  });

  if (loading) {
    return <LoadingState message="Carregando contas..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.title}>
          {formatMonth(mes)}
        </Text>
        <View style={styles.stats}>
          <Chip icon="check-circle" style={styles.chip}>
            {contasDoMes.filter((c) => c.status === 'paga').length} pagas
          </Chip>
          <Chip icon="clock-outline" style={styles.chip}>
            {contasDoMes.filter((c) => c.status === 'pendente').length} pendentes
          </Chip>
        </View>
      </View>

      <Searchbar
        placeholder="Buscar conta..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <SegmentedButtons
        value={statusFilter}
        onValueChange={(value) => setStatusFilter(value as any)}
        buttons={[
          { value: 'todas', label: 'Todas' },
          { value: 'pendente', label: 'Pendentes' },
          { value: 'paga', label: 'Pagas' },
        ]}
        style={styles.filter}
      />

      {contasOrdenadas.length === 0 ? (
        <EmptyState
          title={
            searchQuery
              ? 'Nenhuma conta encontrada'
              : statusFilter === 'todas'
              ? 'Nenhuma conta cadastrada'
              : `Nenhuma conta ${statusFilter}`
          }
          description={
            searchQuery
              ? 'Tente buscar com outros termos'
              : 'Adicione uma nova conta usando o botão +'
          }
        />
      ) : (
        <FlatList
          data={contasOrdenadas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContaItem
              conta={item}
              onPress={() => {
                // TODO: Navigate to edit
                router.push('/modal');
              }}
              onTogglePagamento={() => handleTogglePagamento(item.id, item.status)}
              onDelete={() => handleDelete(item.id, item.nome)}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/modal')}
        label="Nova Conta"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  stats: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    backgroundColor: '#E3F2FD',
  },
  searchbar: {
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  filter: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
