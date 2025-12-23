import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { styles } from './styles';

interface Conta {
  id: number;
  nome: string;
  valor: string;
  parcelas: string;
  pago: boolean;
  vencimento: string;
}

export default function HomeScreen() {
  const [salario, setSalario] = useState('');
  const [contas, setContas] = useState<Conta[]>([]);
  const [nextId, setNextId] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [contaEditando, setContaEditando] = useState<Conta | null>(null);
  
  // Estados do formulário
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [parcelas, setParcelas] = useState('');
  const [pago, setPago] = useState(false);
  const [vencimento, setVencimento] = useState('');

  // Calcular total de contas e saldo
  const totalContas = useMemo(() => {
    return contas.reduce((total, conta) => {
      const valorConta = parseFloat(conta.valor.replace(',', '.')) || 0;
      return total + valorConta;
    }, 0);
  }, [contas]);

  const saldo = useMemo(() => {
    const salarioNumerico = parseFloat(salario.replace(',', '.')) || 0;
    return salarioNumerico - totalContas;
  }, [salario, totalContas]);

  function handleAddBox() {
    setContaEditando(null);
    setNome('');
    setValor('');
    setParcelas('');
    setPago(false);
    setVencimento('');
    setModalVisible(true);
  }

  function handleEditBox(conta: Conta) {
    setContaEditando(conta);
    setNome(conta.nome);
    setValor(conta.valor);
    setParcelas(conta.parcelas);
    setPago(conta.pago);
    setVencimento(conta.vencimento);
    setModalVisible(true);
  }

  function handleSaveConta() {
    if (contaEditando) {
      setContas((prev) =>
        prev.map((c) =>
          c.id === contaEditando.id
            ? { ...c, nome, valor, parcelas, pago, vencimento }
            : c
        )
      );
    } else {
      const novaConta: Conta = {
        id: nextId,
        nome,
        valor,
        parcelas,
        pago,
        vencimento,
      };
      setContas((prev) => [...prev, novaConta]);
      setNextId((prev) => prev + 1);
    }
    setModalVisible(false);
  }

  function handleRemoveBox(id: number) {
    setContas((prev) => prev.filter((conta) => conta.id !== id));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Hello, Matheus</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddBox}>
            <Ionicons name="add-circle" size={32} color="#444444" />
          <Text style={styles.saldoText}>
            Saldo: R$ {saldo.toFixed(2).replace('.', ',')}
          </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bigBox}>
          <Text style={styles.bigBoxLabel}>Salário Mensal</Text>
          <TextInput
            style={styles.salarioInput}
            placeholder="R$ 0,00"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={salario}
            onChangeText={setSalario}
          />
        </View>

        <View style={styles.boxContainer}>
          {contas.map((conta) => (
            <TouchableOpacity 
              key={conta.id} 
              style={styles.box}
              onPress={() => handleEditBox(conta)}
            >
              <View style={styles.boxContent}>
                <Text style={styles.boxText}>{conta.nome || 'Sem nome'}</Text>
                <Text style={styles.boxSubText}>R$ {conta.valor}</Text>
                {conta.pago && <Text style={styles.pagoText}>✓ Pago</Text>}
              </View>
              <TouchableOpacity onPress={() => handleRemoveBox(conta.id)}>
                <Ionicons name="remove-circle" size={25} color='#fff'/>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {contaEditando ? 'Editar Conta' : 'Nova Conta'}
            </Text>

            <Text style={styles.label}>Nome da Conta</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Aluguel"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>Valor</Text>
            <TextInput
              style={styles.input}
              placeholder="0,00"
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
            />

            <Text style={styles.label}>Número de Parcelas</Text>
            <TextInput
              style={styles.input}
              placeholder="1"
              keyboardType="numeric"
              value={parcelas}
              onChangeText={setParcelas}
            />

            <Text style={styles.label}>Data de Vencimento</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              value={vencimento}
              onChangeText={setVencimento}
            />

            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => setPago(!pago)}
            >
              <View style={[styles.checkbox, pago && styles.checkboxChecked]}>
                {pago && <Ionicons name="checkmark" size={20} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>Conta paga</Text>
            </TouchableOpacity>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveConta}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

