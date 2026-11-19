import type { PontoColeta } from '../types';

// Região padrão (usada se o GPS estiver desligado): centro de São Paulo.
export const REGIAO_PADRAO = {
  latitude: -23.5505,
  longitude: -46.6333,
  latitudeDelta: 0.06,
  longitudeDelta: 0.06,
};

export const PONTOS_INICIAIS: PontoColeta[] = [
  { id: 'p1', titulo: 'Ecoponto Sé', tipo: 'ecoponto', latitude: -23.5505, longitude: -46.6340, descricao: 'Recebe entulho, móveis, podas e recicláveis.' },
  { id: 'p2', titulo: 'Coleta de pilhas – Praça da República', tipo: 'pilhas', latitude: -23.5430, longitude: -46.6420, descricao: 'Coletor próximo à entrada principal.' },
  { id: 'p3', titulo: 'Lixeira de reciclagem – Av. Paulista', tipo: 'reciclagem', latitude: -23.5614, longitude: -46.6559, descricao: 'Lixeiras separadas por material.' },
  { id: 'p4', titulo: 'Ponto de óleo – Mercado Municipal', tipo: 'oleo', latitude: -23.5415, longitude: -46.6290, descricao: 'Entregue o óleo em garrafa PET fechada.' },
  { id: 'p5', titulo: 'Eletrônicos – Shopping Light', tipo: 'eletronicos', latitude: -23.5459, longitude: -46.6385, descricao: 'Celulares, cabos e pequenos aparelhos.' },
  { id: 'p6', titulo: 'Ecoponto Liberdade', tipo: 'ecoponto', latitude: -23.5588, longitude: -46.6350, descricao: 'Aberto de segunda a sábado.' },
];
