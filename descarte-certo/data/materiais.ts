import type { Material } from '../types';

// Conteúdo ilustrativo. Regras reais variam por município.
export const MATERIAIS: Material[] = [
  {
    id: 'm1', nome: 'Lâmpadas fluorescentes', categoria: 'Perigoso',
    palavrasChave: ['lampada', 'led', 'mercurio'],
    instrucoes: [
      'Não quebre a lâmpada: ela contém mercúrio.',
      'Embale na caixa original ou em jornal.',
      'Leve a um ponto de coleta de lâmpadas ou ecoponto.',
    ],
    dica: 'Muitas lojas de materiais de construção aceitam lâmpadas usadas.',
  },
  {
    id: 'm2', nome: 'Espelhos', categoria: 'Rejeito',
    palavrasChave: ['espelho', 'vidro'],
    instrucoes: [
      'Espelho não vai junto com o vidro reciclável: o tratamento químico atrapalha a fusão.',
      'Envolva em jornal ou papelão para evitar cortes.',
      'Leve ao ecoponto ou descarte como rejeito, conforme a regra local.',
    ],
  },
  {
    id: 'm3', nome: 'Isopor', categoria: 'Reciclável',
    palavrasChave: ['poliestireno', 'bandeja', 'eps'],
    instrucoes: [
      'Retire restos de alimento e fitas adesivas.',
      'Junte com os recicláveis secos.',
      'Se a coleta seletiva não aceitar, procure um ecoponto.',
    ],
    dica: 'Quanto mais limpo e seco, maior a chance de ser reciclado.',
  },
  {
    id: 'm4', nome: 'Óleo de cozinha', categoria: 'Perigoso',
    palavrasChave: ['oleo', 'gordura', 'fritura'],
    instrucoes: [
      'Espere o óleo esfriar e coe os resíduos sólidos.',
      'Guarde em garrafa PET bem fechada.',
      'Entregue em ponto de coleta de óleo. Nunca jogue na pia.',
    ],
    dica: 'Um litro de óleo pode contaminar milhares de litros de água.',
  },
  {
    id: 'm5', nome: 'Eletrônicos', categoria: 'Perigoso',
    palavrasChave: ['celular', 'computador', 'cabo', 'carregador', 'ewaste'],
    instrucoes: [
      'Apague seus dados pessoais antes de entregar.',
      'Remova pilhas e baterias, se possível.',
      'Entregue em ponto de logística reversa ou ecoponto.',
    ],
  },
  {
    id: 'm6', nome: 'Pilhas e baterias', categoria: 'Perigoso',
    palavrasChave: ['pilha', 'bateria', 'litio'],
    instrucoes: [
      'Não misture com lixo comum.',
      'Guarde em pote seco até juntar uma quantidade.',
      'Deposite em coletores de supermercados, farmácias e lojas de eletrônicos.',
    ],
  },
  {
    id: 'm7', nome: 'Medicamentos vencidos', categoria: 'Perigoso',
    palavrasChave: ['remedio', 'comprimido', 'xarope'],
    instrucoes: [
      'Mantenha na embalagem original.',
      'Leve a uma farmácia ou unidade de saúde com coletor.',
      'Nunca jogue no vaso sanitário ou na pia.',
    ],
  },
  {
    id: 'm8', nome: 'Caixa de pizza', categoria: 'Reciclável',
    palavrasChave: ['papelao', 'gordura'],
    instrucoes: [
      'Separe a parte limpa da parte engordurada.',
      'A parte limpa vai para o reciclável seco.',
      'A parte engordurada pode ir para a compostagem, em pedaços pequenos.',
    ],
  },
  {
    id: 'm9', nome: 'Cascas de frutas e legumes', categoria: 'Orgânico',
    palavrasChave: ['casca', 'fruta', 'verdura', 'compostagem', 'borra', 'cafe'],
    instrucoes: [
      'Separe de plásticos, vidros e papéis.',
      'Use em composteira doméstica ou entregue em ponto de compostagem.',
      'Sem composteira, descarte no lixo orgânico, se houver coleta.',
    ],
  },
  {
    id: 'm10', nome: 'Embalagem longa vida', categoria: 'Reciclável',
    palavrasChave: ['tetra pak', 'caixa de leite', 'caixinha', 'suco'],
    instrucoes: [
      'Enxágue rapidamente e deixe secar.',
      'Desmonte e amasse a caixa.',
      'Coloque junto dos recicláveis secos.',
    ],
  },
  {
    id: 'm11', nome: 'Fraldas descartáveis', categoria: 'Rejeito',
    palavrasChave: ['fralda', 'absorvente'],
    instrucoes: [
      'Descarte os dejetos no vaso sanitário.',
      'Embrulhe a fralda em um saco fechado.',
      'Coloque no lixo comum (rejeito).',
    ],
  },
];
