import { useMemo } from 'react';
import { Conta, Resumo } from '@/types';
import { getCurrentMonth } from '@/utils/formatters';

export const useResumo = (contas: Conta[], totalRenda: number, mes?: string): Resumo => {
  return useMemo(() => {
    const mesAtual = mes || getCurrentMonth();
    const contasDoMes = contas.filter((c) => c.mes === mesAtual);

    const totalDespesas = contasDoMes.reduce((acc, c) => acc + c.valor, 0);
    const totalPagas = contasDoMes
      .filter((c) => c.status === 'paga')
      .reduce((acc, c) => acc + c.valor, 0);
    const totalPendentes = contasDoMes
      .filter((c) => c.status === 'pendente')
      .reduce((acc, c) => acc + c.valor, 0);

    const contasPagas = contasDoMes.filter((c) => c.status === 'paga').length;
    const contasPendentes = contasDoMes.filter((c) => c.status === 'pendente').length;

    const saldoEstimado = totalRenda - totalDespesas;

    return {
      mes: mesAtual,
      totalDespesas,
      totalPagas,
      totalPendentes,
      totalRenda,
      saldoEstimado,
      contasPagas,
      contasPendentes,
    };
  }, [contas, totalRenda, mes]);
};
