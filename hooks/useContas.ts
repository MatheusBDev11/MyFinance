import * as storage from '@/services/storage';
import { Conta, FiltrosContas } from '@/types';
import { getCurrentMonth } from '@/utils/formatters';
import { useCallback, useEffect, useState } from 'react';

export const useContas = (mesInicial?: string) => {
  const [contas, setContas] = useState<Conta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mes, setMes] = useState(mesInicial || getCurrentMonth());

  const loadContas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await storage.getContas();
      setContas(data);
    } catch (err) {
      setError('Erro ao carregar contas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContas();
  }, [loadContas]);

  const addConta = async (conta: Omit<Conta, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const novaConta = await storage.saveConta(conta);
      setContas((prev) => [...prev, novaConta]);
      return novaConta;
    } catch (err) {
      setError('Erro ao adicionar conta');
      throw err;
    }
  };

  const updateConta = async (id: string, updates: Partial<Conta>) => {
    try {
      const updated = await storage.updateConta(id, updates);
      if (updated) {
        setContas((prev) => prev.map((c) => (c.id === id ? updated : c)));
      }
      return updated;
    } catch (err) {
      setError('Erro ao atualizar conta');
      throw err;
    }
  };

  const deleteConta = async (id: string) => {
    try {
      const success = await storage.deleteConta(id);
      if (success) {
        setContas((prev) => prev.filter((c) => c.id !== id));
      }
      return success;
    } catch (err) {
      setError('Erro ao deletar conta');
      throw err;
    }
  };

  const togglePagamento = async (id: string, status: 'paga' | 'pendente') => {
    try {
      const updated =
        status === 'paga'
          ? await storage.marcarContaPaga(id)
          : await storage.marcarContaPendente(id);

      if (updated) {
        setContas((prev) => prev.map((c) => (c.id === id ? updated : c)));
      }
      return updated;
    } catch (err) {
      setError('Erro ao atualizar status');
      throw err;
    }
  };

  // Filtrar contas
  const filterContas = (filtros: FiltrosContas): Conta[] => {
    let filtered = [...contas];

    // Filtro por mês
    if (filtros.mes) {
      filtered = filtered.filter((c) => c.mes === filtros.mes);
    }

    // Filtro por status
    if (filtros.status && filtros.status !== 'todas') {
      filtered = filtered.filter((c) => c.status === filtros.status);
    }

    // Filtro por categoria
    if (filtros.categoria && filtros.categoria !== 'todas') {
      filtered = filtered.filter((c) => c.categoria === filtros.categoria);
    }

    // Busca por nome
    if (filtros.busca && filtros.busca.trim()) {
      const busca = filtros.busca.toLowerCase();
      filtered = filtered.filter((c) => c.nome.toLowerCase().includes(busca));
    }

    return filtered;
  };

  // Contas do mês atual
  const contasDoMes = contas.filter((c) => c.mes === mes);

  return {
    contas,
    contasDoMes,
    loading,
    error,
    mes,
    setMes,
    addConta,
    updateConta,
    deleteConta,
    togglePagamento,
    filterContas,
    refresh: loadContas,
  };
};
