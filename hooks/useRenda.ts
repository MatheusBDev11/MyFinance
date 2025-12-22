import { useState, useEffect, useCallback } from 'react';
import { Renda } from '@/types';
import * as storage from '@/services/storage';
import { getCurrentMonth } from '@/utils/formatters';

export const useRenda = (mesInicial?: string) => {
  const [renda, setRenda] = useState<Renda | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mes, setMes] = useState(mesInicial || getCurrentMonth());

  const loadRenda = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await storage.getRenda(mes);
      setRenda(data);
    } catch (err) {
      setError('Erro ao carregar renda');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [mes]);

  useEffect(() => {
    loadRenda();
  }, [loadRenda]);

  const saveRenda = async (rendaFixa: number, rendaExtra: number) => {
    try {
      const novaRenda = await storage.saveRenda(rendaFixa, rendaExtra, mes);
      setRenda(novaRenda);
      return novaRenda;
    } catch (err) {
      setError('Erro ao salvar renda');
      throw err;
    }
  };

  const totalRenda = renda ? renda.rendaFixa + renda.rendaExtra : 0;

  return {
    renda,
    loading,
    error,
    mes,
    setMes,
    totalRenda,
    saveRenda,
    refresh: loadRenda,
  };
};
