import { ResumoCard } from '@/components/dashboard/ResumoCard';
import { TotalCard } from '@/components/dashboard/TotalCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { useContas } from '@/hooks/useContas';
import { useRenda } from '@/hooks/useRenda';
import { useResumo } from '@/hooks/useResumo';
import { formatMonth, getCurrentMonth } from '@/utils/formatters';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Button, FAB, Text } from 'react-native-paper';

export default function DashboardScreen() {
  const router = useRouter();
  const [mes] = useState(getCurrentMonth());
  
  const { contas, loading: loadingContas, refresh: refreshContas } = useContas(mes);
  const { totalRenda, loading: loadingRenda, refresh: refreshRenda } = useRenda(mes);
  const resumo = useResumo(contas, totalRenda, mes);

  const loading = loadingContas || loadingRenda;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refreshContas(), refreshRenda()]);
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return <LoadingState message="Carregando dados..." />;
  }

  const hasContas = contas.filter((c) => c.mes === mes).length > 0;
  const hasRenda = totalRenda > 0;

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            MyFinance
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            {formatMonth(mes)}
          </Text>
        </View>

        {!hasRenda && (
          <View style={styles.alert}>
            <Text variant="bodyMedium" style={styles.alertText}>
              Configure sua renda mensal para ver o resumo completo
            </Text>
            <Button mode="contained" onPress={() => router.push('/renda')} style={styles.alertButton}>
              Configurar Renda
            </Button>
          </View>
        )}

        <ResumoCard resumo={resumo} />

        <View style={styles.totaisContainer}>
          <TotalCard
            title="Contas Pagas"
            value={resumo.totalPagas}
            color="#4CAF50"
            subtitle={`${resumo.contasPagas} conta${resumo.contasPagas !== 1 ? 's' : ''}`}
          />
          <TotalCard
            title="Contas Pendentes"
            value={resumo.totalPendentes}
            color="#FF9800"
            subtitle={`${resumo.contasPendentes} conta${resumo.contasPendentes !== 1 ? 's' : ''}`}
          />
        </View>

        {!hasContas && (
          <EmptyState
            title="Nenhuma conta cadastrada"
            description="Adicione suas contas para começar a organizar suas finanças"
          />
        )}

        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={() => router.push('/contas')}
            icon="credit-card"
            style={styles.actionButton}
          >
            Ver Todas as Contas
          </Button>
          <Button
            mode="outlined"
            onPress={() => router.push('/renda')}
            icon="cash"
            style={styles.actionButton}
          >
            Configurar Renda
          </Button>
        </View>
      </ScrollView>

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
    paddingTop: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    opacity: 0.6,
  },
  alert: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  alertText: {
    marginBottom: 12,
    color: '#856404',
  },
  alertButton: {
    backgroundColor: '#FF9800',
  },
  totaisContainer: {
    paddingHorizontal: 8,
  },
  actions: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
