import { CategoriaInfo } from '@/types';

export const CATEGORIAS: CategoriaInfo[] = [
  { value: 'moradia', label: 'Moradia', icon: 'home', color: '#FF6B6B' },
  { value: 'transporte', label: 'Transporte', icon: 'car', color: '#4ECDC4' },
  { value: 'alimentacao', label: 'Alimentação', icon: 'food', color: '#95E1D3' },
  { value: 'saude', label: 'Saúde', icon: 'medical-bag', color: '#F38181' },
  { value: 'educacao', label: 'Educação', icon: 'school', color: '#AA96DA' },
  { value: 'lazer', label: 'Lazer', icon: 'gamepad-variant', color: '#FCBAD3' },
  { value: 'servicos', label: 'Serviços', icon: 'wifi', color: '#A8D8EA' },
  { value: 'outros', label: 'Outros', icon: 'dots-horizontal', color: '#B8B8B8' },
];

export const getCategoriaInfo = (categoria: string): CategoriaInfo => {
  return CATEGORIAS.find((c) => c.value === categoria) || CATEGORIAS[CATEGORIAS.length - 1];
};

export const MESES_CURTOS = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

export const STORAGE_KEYS = {
  CONTAS: '@myfinance:contas',
  RENDA: '@myfinance:renda',
} as const;
