// ===========================
// TIPOS PRINCIPAIS
// ===========================

export type Categoria =
  | 'moradia'
  | 'transporte'
  | 'alimentacao'
  | 'saude'
  | 'educacao'
  | 'lazer'
  | 'servicos'
  | 'outros';

export type StatusConta = 'paga' | 'pendente';

export interface Conta {
  id: string;
  nome: string;
  categoria: Categoria;
  valor: number;
  vencimento: number; // Dia do mês (1-31)
  status: StatusConta;
  mes: string; // Formato: YYYY-MM
  dataPagamento?: string; // ISO string
  createdAt: string;
  updatedAt: string;
}

export interface Renda {
  id: string;
  rendaFixa: number; // Salário
  rendaExtra: number; // Freelance, bônus, etc
  mes: string; // Formato: YYYY-MM
  updatedAt: string;
}

export interface Resumo {
  mes: string;
  totalDespesas: number;
  totalPagas: number;
  totalPendentes: number;
  totalRenda: number;
  saldoEstimado: number;
  contasPagas: number;
  contasPendentes: number;
}

// ===========================
// TIPOS AUXILIARES
// ===========================

export interface FiltrosContas {
  mes?: string;
  status?: StatusConta | 'todas';
  categoria?: Categoria | 'todas';
  busca?: string;
}

export interface ContaFormData {
  nome: string;
  categoria: Categoria;
  valor: string; // String para input controlado
  vencimento: string;
}

export interface CategoriaInfo {
  value: Categoria;
  label: string;
  icon: string;
  color: string;
}

// ===========================
// TIPOS DE STORAGE
// ===========================

export interface StorageKeys {
  CONTAS: '@myfinance:contas';
  RENDA: '@myfinance:renda';
}
