import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, SegmentedButtons, Menu } from 'react-native-paper';
import { Conta, Categoria, ContaFormData } from '@/types';
import { CATEGORIAS } from '@/constants/categorias';
import { parseCurrencyInput } from '@/utils/formatters';

interface ContaFormProps {
  initialData?: Conta;
  onSubmit: (data: Omit<Conta, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const ContaForm: React.FC<ContaFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [nome, setNome] = useState(initialData?.nome || '');
  const [valor, setValor] = useState(initialData?.valor.toString() || '');
  const [vencimento, setVencimento] = useState(initialData?.vencimento.toString() || '');
  const [categoria, setCategoria] = useState<Categoria>(initialData?.categoria || 'outros');
  const [status, setStatus] = useState(initialData?.status || 'pendente');
  const [menuVisible, setMenuVisible] = useState(false);

  const categoriaAtual = CATEGORIAS.find((c) => c.value === categoria) || CATEGORIAS[0];

  const handleSubmit = () => {
    if (!nome.trim() || !valor || !vencimento) {
      alert('Preencha todos os campos');
      return;
    }

    const vencimentoNum = parseInt(vencimento);
    if (vencimentoNum < 1 || vencimentoNum > 31) {
      alert('Vencimento deve ser entre 1 e 31');
      return;
    }

    const valorNum = parseCurrencyInput(valor);
    if (valorNum <= 0) {
      alert('Valor deve ser maior que zero');
      return;
    }

    // Get current month
    const now = new Date();
    const mes = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    onSubmit({
      nome: nome.trim(),
      valor: valorNum,
      vencimento: vencimentoNum,
      categoria,
      status,
      mes,
      dataPagamento: status === 'paga' ? new Date().toISOString() : undefined,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        {initialData ? 'Editar Conta' : 'Nova Conta'}
      </Text>

      <TextInput
        label="Nome da conta"
        value={nome}
        onChangeText={setNome}
        mode="outlined"
        style={styles.input}
        placeholder="Ex: Aluguel, Internet, Cartão..."
      />

      <TextInput
        label="Valor"
        value={valor}
        onChangeText={setValor}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
        placeholder="0.00"
        left={<TextInput.Affix text="R$" />}
      />

      <TextInput
        label="Dia do vencimento"
        value={vencimento}
        onChangeText={setVencimento}
        mode="outlined"
        keyboardType="number-pad"
        style={styles.input}
        placeholder="1 a 31"
        maxLength={2}
      />

      <Text variant="labelLarge" style={styles.label}>
        Categoria
      </Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            icon={categoriaAtual.icon}
            style={styles.categoryButton}
          >
            {categoriaAtual.label}
          </Button>
        }
      >
        {CATEGORIAS.map((cat) => (
          <Menu.Item
            key={cat.value}
            onPress={() => {
              setCategoria(cat.value);
              setMenuVisible(false);
            }}
            title={cat.label}
            leadingIcon={cat.icon}
          />
        ))}
      </Menu>

      <Text variant="labelLarge" style={styles.label}>
        Status
      </Text>
      <SegmentedButtons
        value={status}
        onValueChange={(value) => setStatus(value as any)}
        buttons={[
          { value: 'pendente', label: 'Pendente' },
          { value: 'paga', label: 'Paga' },
        ]}
        style={styles.segmented}
      />

      <View style={styles.actions}>
        <Button mode="outlined" onPress={onCancel} style={styles.button}>
          Cancelar
        </Button>
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          {initialData ? 'Salvar' : 'Adicionar'}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    marginTop: 8,
  },
  categoryButton: {
    marginBottom: 16,
  },
  segmented: {
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  button: {
    flex: 1,
  },
});
