import AsyncStorage from '@react-native-async-storage/async-storage';
import { Conta, Renda } from '@/types';
import { STORAGE_KEYS } from '@/constants/categorias';
import { generateId, getCurrentMonth } from '@/utils/formatters';

// ===========================
// CONTAS - CRUD
// ===========================

/**
 * Busca todas as contas salvas
 */
export const getContas = async (): Promise<Conta[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CONTAS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao buscar contas:', error);
    return [];
  }
};

/**
 * Salva uma nova conta
 */
export const saveConta = async (conta: Omit<Conta, 'id' | 'createdAt' | 'updatedAt'>): Promise<Conta> => {
  try {
    const contas = await getContas();
    const now = new Date().toISOString();
    
    const novaConta: Conta = {
      ...conta,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    
    contas.push(novaConta);
    await AsyncStorage.setItem(STORAGE_KEYS.CONTAS, JSON.stringify(contas));
    
    return novaConta;
  } catch (error) {
    console.error('Erro ao salvar conta:', error);
    throw error;
  }
};

/**
 * Atualiza uma conta existente
 */
export const updateConta = async (id: string, updates: Partial<Conta>): Promise<Conta | null> => {
  try {
    const contas = await getContas();
    const index = contas.findIndex((c) => c.id === id);
    
    if (index === -1) return null;
    
    const contaAtualizada: Conta = {
      ...contas[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    contas[index] = contaAtualizada;
    await AsyncStorage.setItem(STORAGE_KEYS.CONTAS, JSON.stringify(contas));
    
    return contaAtualizada;
  } catch (error) {
    console.error('Erro ao atualizar conta:', error);
    throw error;
  }
};

/**
 * Remove uma conta
 */
export const deleteConta = async (id: string): Promise<boolean> => {
  try {
    const contas = await getContas();
    const filteredContas = contas.filter((c) => c.id !== id);
    
    await AsyncStorage.setItem(STORAGE_KEYS.CONTAS, JSON.stringify(filteredContas));
    return true;
  } catch (error) {
    console.error('Erro ao deletar conta:', error);
    return false;
  }
};

/**
 * Marca uma conta como paga
 */
export const marcarContaPaga = async (id: string): Promise<Conta | null> => {
  return updateConta(id, {
    status: 'paga',
    dataPagamento: new Date().toISOString(),
  });
};

/**
 * Marca uma conta como pendente
 */
export const marcarContaPendente = async (id: string): Promise<Conta | null> => {
  return updateConta(id, {
    status: 'pendente',
    dataPagamento: undefined,
  });
};

// ===========================
// RENDA - CRUD
// ===========================

/**
 * Busca a renda de um mês específico
 */
export const getRenda = async (mes?: string): Promise<Renda | null> => {
  try {
    const mesAtual = mes || getCurrentMonth();
    const data = await AsyncStorage.getItem(STORAGE_KEYS.RENDA);
    
    if (!data) return null;
    
    const rendas: Renda[] = JSON.parse(data);
    return rendas.find((r) => r.mes === mesAtual) || null;
  } catch (error) {
    console.error('Erro ao buscar renda:', error);
    return null;
  }
};

/**
 * Salva ou atualiza a renda de um mês
 */
export const saveRenda = async (rendaFixa: number, rendaExtra: number, mes?: string): Promise<Renda> => {
  try {
    const mesAtual = mes || getCurrentMonth();
    const data = await AsyncStorage.getItem(STORAGE_KEYS.RENDA);
    let rendas: Renda[] = data ? JSON.parse(data) : [];
    
    const index = rendas.findIndex((r) => r.mes === mesAtual);
    const now = new Date().toISOString();
    
    const novaRenda: Renda = {
      id: index >= 0 ? rendas[index].id : generateId(),
      rendaFixa,
      rendaExtra,
      mes: mesAtual,
      updatedAt: now,
    };
    
    if (index >= 0) {
      rendas[index] = novaRenda;
    } else {
      rendas.push(novaRenda);
    }
    
    await AsyncStorage.setItem(STORAGE_KEYS.RENDA, JSON.stringify(rendas));
    return novaRenda;
  } catch (error) {
    console.error('Erro ao salvar renda:', error);
    throw error;
  }
};

/**
 * Busca todas as rendas (para histórico)
 */
export const getAllRendas = async (): Promise<Renda[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.RENDA);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao buscar todas as rendas:', error);
    return [];
  }
};

// ===========================
// UTILIDADES
// ===========================

/**
 * Limpa todos os dados (útil para testes)
 */
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEYS.CONTAS, STORAGE_KEYS.RENDA]);
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
  }
};
