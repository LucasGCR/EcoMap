import type { LeiMunicipal } from '../types';

// Textos fictícios, apenas para o protótipo. Não são normas reais.
export const LEIS_EXEMPLO: LeiMunicipal[] = [
  {
    id: 'l1', titulo: 'Coleta seletiva (exemplo)', tema: 'Resíduos recicláveis',
    resumo: 'Define a separação de recicláveis secos e orgânicos nos domicílios.',
    pontos: ['Recicláveis secos em sacos separados.', 'Coleta em dias alternados por bairro.', 'Condomínios devem manter pontos de entrega voluntária.'],
  },
  {
    id: 'l2', titulo: 'Logística reversa (exemplo)', tema: 'Pilhas, eletrônicos e lâmpadas',
    resumo: 'Obriga comerciantes a receber produtos pós-consumo de seus fabricantes.',
    pontos: ['Lojas devem manter coletor visível.', 'Consumidor entrega sem custo.', 'Fabricantes respondem pelo destino final.'],
  },
  {
    id: 'l3', titulo: 'Descarte irregular (exemplo)', tema: 'Multas e fiscalização',
    resumo: 'Prevê multa para descarte de entulho, móveis e resíduos em vias públicas.',
    pontos: ['Denúncias podem ser feitas pelo canal da prefeitura.', 'Pequenos volumes podem ir a ecopontos.', 'Reincidência aumenta a penalidade.'],
  },
];
