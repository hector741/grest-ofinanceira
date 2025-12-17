/* =========================================================
   STATE.JS
   Estado global da aplicação
   ========================================================= */

/**
 * Objeto central de estado
 * Tudo que o sistema sabe sobre a vida financeira do usuário
 * deve estar aqui
 */
let state = {
  /* =========================
     LANÇAMENTOS
     ========================= */
  lancamentos: [
    /*
    {
      id: 1,
      data: "2025-01-10",
      descricao: "Supermercado",
      tipo: "despesa",        // receita | despesa
      fixo: "variavel",       // fixa | variavel
      categoria: "Alimentação",
      valor: 350.50
    }
    */
  ],

  /* =========================
     CARTÕES DE CRÉDITO
     ========================= */
  cartoes: [
    /*
    {
      id: 1,
      nome: "Nubank",
      limite: 5000,
      fechamento: 10,
      vencimento: 20
    }
    */
  ],

  /* =========================
     COMPRAS NO CARTÃO
     ========================= */
  comprasCartao: [
    /*
    {
      id: 1,
      cartaoId: 1,
      descricao: "Notebook",
      valorTotal: 3000,
      parcelas: 10,
      dataCompra: "2025-01-15"
    }
    */
  ],

  /* =========================
     DÍVIDAS
     ========================= */
  dividas: [
    /*
    {
      id: 1,
      nome: "Empréstimo Banco",
      valorTotal: 10000,
      taxaJuros: 1.5,
      parcelas: 24,
      dataInicio: "2025-01-01",
      dataQuitacaoDesejada: "2026-12-01"
    }
    */
  ],

  /* =========================
     ASSINATURAS
     ========================= */
  assinaturas: [
    /*
    {
      id: 1,
      nome: "Netflix",
      categoria: "Streaming",
      valorMensal: 39.90,
      diaCobranca: 15,
      formaPagamento: "Crédito",
      status: "ativa",          // ativa | cancelada
      reajusteAnual: 0.1        // 10%
    }
    */
  ]
};

/* =========================================================
   GERADORES DE ID
   ========================================================= */

/**
 * Gera um ID simples baseado em timestamp
 * Suficiente para uso local (sem backend)
 */
function gerarId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}
