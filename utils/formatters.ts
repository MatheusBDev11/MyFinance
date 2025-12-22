/**
 * Formata um número para moeda brasileira (BRL)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Converte string de valor para número
 */
export const parseCurrencyInput = (value: string): number => {
  // Remove tudo exceto números e vírgula/ponto
  const cleaned = value.replace(/[^\d,.-]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};

/**
 * Retorna o mês atual no formato YYYY-MM
 */
export const getCurrentMonth = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

/**
 * Formata mês YYYY-MM para exibição (ex: "Janeiro 2024")
 */
export const formatMonth = (monthStr: string): string => {
  const [year, month] = monthStr.split('-');
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

/**
 * Formata data ISO para DD/MM/YYYY
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Gera um ID único simples
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Verifica se uma conta está próxima do vencimento
 */
export const isDuesSoon = (vencimento: number, status: string): boolean => {
  if (status === 'paga') return false;
  
  const today = new Date().getDate();
  const diasRestantes = vencimento - today;
  
  return diasRestantes >= 0 && diasRestantes <= 3;
};

/**
 * Verifica se uma conta está vencida
 */
export const isOverdue = (vencimento: number, status: string): boolean => {
  if (status === 'paga') return false;
  
  const today = new Date().getDate();
  return vencimento < today;
};
