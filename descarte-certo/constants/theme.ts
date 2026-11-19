import { MD3LightTheme } from 'react-native-paper';
import type { CategoriaResiduo, TipoPonto } from '../types';

export const cores = {
  tinta: '#10302B',
  musgo: '#1F6F5C',
  menta: '#D9EEE5',
  papel: '#F6F8F5',
  sol: '#F0B429',
  alerta: '#B4411F',
  cinza: '#5F6B68',
  borda: '#DCE4DF',
};

export const tema = {
  ...MD3LightTheme,
  roundness: 3,
  colors: {
    ...MD3LightTheme.colors,
    primary: cores.musgo,
    onPrimary: '#FFFFFF',
    primaryContainer: cores.menta,
    onPrimaryContainer: cores.tinta,
    secondary: cores.sol,
    background: cores.papel,
    surface: '#FFFFFF',
    onSurface: cores.tinta,
    outline: cores.borda,
  },
};

export const tiposDePonto: Record<
  TipoPonto,
  { rotulo: string; icone: string; cor: string }
> = {
  ecoponto: { rotulo: 'Ecoponto', icone: 'recycle', cor: '#1F6F5C' },
  reciclagem: { rotulo: 'Lixeira de reciclagem', icone: 'delete-variant', cor: '#2B6CB0' },
  pilhas: { rotulo: 'Coleta de pilhas', icone: 'battery-alert-variant-outline', cor: '#C05621' },
  oleo: { rotulo: 'Óleo de cozinha', icone: 'water', cor: '#B7791F' },
  eletronicos: { rotulo: 'Eletrônicos', icone: 'chip', cor: '#6B46C1' },
};

export const categorias: Record<CategoriaResiduo, { cor: string; icone: string }> = {
  Reciclável: { cor: '#2B6CB0', icone: 'recycle' },
  Orgânico: { cor: '#4C8C2B', icone: 'leaf' },
  Perigoso: { cor: '#B4411F', icone: 'alert-octagon-outline' },
  Rejeito: { cor: '#5F6B68', icone: 'trash-can-outline' },
};
