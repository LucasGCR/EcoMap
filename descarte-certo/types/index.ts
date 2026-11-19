export type CategoriaResiduo = 'Reciclável' | 'Orgânico' | 'Perigoso' | 'Rejeito';

export interface Material {
  id: string;
  nome: string;
  categoria: CategoriaResiduo;
  instrucoes: string[];
  dica?: string;
  palavrasChave: string[];
}

export type TipoPonto = 'ecoponto' | 'reciclagem' | 'pilhas' | 'oleo' | 'eletronicos';

export interface PontoColeta {
  id: string;
  titulo: string;
  tipo: TipoPonto;
  latitude: number;
  longitude: number;
  descricao?: string;
  enviadoPorUsuario?: boolean;
}

export interface Post {
  id: string;
  autor: string;
  bairro: string;
  texto: string;
  curtidas: number;
  comentarios: number;
  tempo: string;
  curtido?: boolean;
}

export interface LeiMunicipal {
  id: string;
  titulo: string;
  tema: string;
  resumo: string;
  pontos: string[];
}
