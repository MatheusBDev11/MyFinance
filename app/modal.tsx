import { ContaForm } from '@/components/contas/ContaForm';
import { useContas } from '@/hooks/useContas';
import { Conta } from '@/types';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ModalScreen() {
  const router = useRouter();
  const { addConta } = useContas();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (data: Omit<Conta, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsSaving(true);
      await addConta(data);
      router.back();
    } catch (error) {
      console.error('Erro ao salvar conta:', error);
      alert('Erro ao salvar conta');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <ContaForm onSubmit={handleSubmit} onCancel={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
