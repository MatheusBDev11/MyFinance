import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useRenda } from '@/hooks/useRenda';
import { LoadingState } from '@/components/ui/LoadingState';
import { formatCurrency, parseCurrencyInput, formatMonth, getCurrentMonth } from '@/utils/formatters';

export default function RendaScreen() {
  const router = useRouter();
  const [mes] = useState(getCurrentMonth());
  const { renda, loading, saveRenda, totalRenda } = useRenda(mes);

  const [rendaFixa, setRendaFixa] = useState('');
  const [rendaExtra, setRendaExtra] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (renda) {
      setRendaFixa(renda.rendaFixa.toString());
      setRendaExtra(renda.rendaExtra.toString());
    }
  }, [renda]);

  const handleSave = async () => {
    const fixaNum = parseCurrencyInput(rendaFixa);
    const extraNum = parseCurrencyInput(rendaExtra);

    if (fixaNum < 0 || extraNum < 0) {
      Alert.alert('Erro', 'Os valores devem ser positivos');
      return;
    }

    try {
      setIsSaving(true);
      await saveRenda(fixaNum, extraNum);
      Alert.alert(
        'Sucesso!',
        'Renda salva com sucesso',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a renda');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Carregando renda..." />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          Configuração de Renda
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {formatMonth(mes)}
        </Text>
      </View>

      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Renda Fixa
          </Text>
          <Text variant="bodySmall" style={styles.description}>
            Seu salário ou fonte de renda regular mensal
          </Text>
          <TextInput
            label="Valor"
            value={rendaFixa}
            onChangeText={setRendaFixa}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            placeholder="0.00"
            left={<TextInput.Affix text="R$" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Renda Extra
          </Text>
          <Text variant="bodySmall" style={styles.description}>
            Freelance, bônus, trabalhos extras, etc.
          </Text>
          <TextInput
            label="Valor"
            value={rendaExtra}
            onChangeText={setRendaExtra}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            placeholder="0.00"
            left={<TextInput.Affix text="R$" />}
          />
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.totalCard]} mode="elevated">
        <Card.Content>
          <Text variant="bodyMedium" style={styles.totalLabel}>
            Renda Total do Mês
          </Text>
          <Text variant="displaySmall" style={styles.totalValue}>
            {formatCurrency(parseCurrencyInput(rendaFixa) + parseCurrencyInput(rendaExtra))}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Button
          mode="outlined"
          onPress={() => router.back()}
          style={styles.button}
          disabled={isSaving}
        >
          Cancelar
        </Button>
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.button}
          loading={isSaving}
          disabled={isSaving}
        >
          Salvar
        </Button>
      </View>

      {renda && (
        <View style={styles.info}>
          <Text variant="bodySmall" style={styles.infoText}>
            💡 Dica: Configure sua renda todo mês para acompanhar seu saldo estimado
          </Text>
        </View>
      )}
    </ScrollView>
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
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    opacity: 0.6,
    marginTop: 4,
  },
  card: {
    margin: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    opacity: 0.6,
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  totalCard: {
    backgroundColor: '#E3F2FD',
    marginTop: 8,
  },
  totalLabel: {
    opacity: 0.7,
    marginBottom: 8,
  },
  totalValue: {
    fontWeight: 'bold',
    color: '#1976D2',
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  button: {
    flex: 1,
  },
  info: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  infoText: {
    color: '#856404',
  },
});
