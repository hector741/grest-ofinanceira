/* =========================================================
   DATA.JS
   Dados fixos e configurações globais
   ========================================================= */

/* =========================
   CATEGORIAS
========================= */

const CATEGORIAS = {
  receita: [
    "Salário",
    "Freelance",
    "Investimentos",
    "Vendas",
    "Outros"
  ],
  despesa: [
    "Alimentação",
    "Moradia",
    "Transporte",
    "Lazer",
    "Saúde",
    "Educação",
    "Outros"
  ]
};

/* =========================
   FORMAS DE PAGAMENTO
========================= */

const FORMAS_PAGAMENTO = [
  "Dinheiro",
  "Débito",
  "Crédito",
  "PIX",
  "Transferência"
];

/* =========================
   MESES DO ANO
========================= */

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];

/* =========================
   CENÁRIOS DE SIMULAÇÃO
========================= */

const CENARIOS = {
  conservador: {
    nome: "Conservador",
    ajusteReceita: -0.1,   // -10%
    ajusteDespesa: +0.1    // +10%
  },
  realista: {
    nome: "Realista",
    ajusteReceita: 0,
    ajusteDespesa: 0
  },
  otimista: {
    nome: "Otimista",
    ajusteReceita: +0.1,   // +10%
    ajusteDespesa: -0.1    // -10%
  }
};

/* =========================
   CONFIGURAÇÕES GERAIS
========================= */

const CONFIG = {
  moeda: "BRL",
  locale: "pt-BR",
  appName: "Gestão Financeira",
  storageKey: "financeApp"
};

/* =========================
   UTILITÁRIOS SIMPLES
========================= */

/**
 * Retorna o nome do mês a partir do índice (0-11)
 */
function getNomeMes(index) {
  return MESES[index] || "";
}
