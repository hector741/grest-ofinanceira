/* =========================================================
   FINANCE.JS
   Motor financeiro da aplicação
   ========================================================= */

/* =========================
   UTILITÁRIOS
========================= */

/**
 * Retorna mês (0–11) a partir de uma data
 */
function getMesFromDate(data) {
  return new Date(data).getMonth();
}

/**
 * Retorna ano a partir de uma data
 */
function getAnoFromDate(data) {
  return new Date(data).getFullYear();
}

/* =========================
   CÁLCULOS DE LANÇAMENTOS
========================= */

/**
 * Calcula totais de um mês específico
 */
function calcularTotaisMes(mes, ano = new Date().getFullYear()) {
  let receitas = 0;
  let despesas = 0;
  let comprometido = 0;

  state.lancamentos.forEach(l => {
    const mesLancamento = getMesFromDate(l.data);
    const anoLancamento = getAnoFromDate(l.data);

    if (mesLancamento === mes && anoLancamento === ano) {
      if (l.tipo === "receita") {
        receitas += l.valor;
      } else {
        despesas += l.valor;
        if (l.fixo === "fixa") {
          comprometido += l.valor;
        }
      }
    }
  });

  return {
    receitas,
    despesas,
    comprometido,
    saldo: receitas - despesas,
    saldoDisponivel: receitas - despesas - comprometido
  };
}

/**
 * Calcula totais do mês atual
 */
function calcularMesAtual() {
  const hoje = new Date();
  return calcularTotaisMes(hoje.getMonth(), hoje.getFullYear());
}

/* =========================
   SIMULAÇÃO MENSAL / ANUAL
========================= */

/**
 * Simula o ano inteiro (Jan–Dez)
 */
function simularAno(ano = new Date().getFullYear()) {
  let resultado = [];

  for (let mes = 0; mes < 12; mes++) {
    resultado.push({
      mes,
      nomeMes: MESES[mes],
      ...calcularTotaisMes(mes, ano)
    });
  }

  return resultado;
}

/**
 * Simula cenário financeiro
 */
function simularCenario(tipoCenario, ano = new Date().getFullYear()) {
  const config = CENARIOS[tipoCenario];
  const base = simularAno(ano);

  return base.map(mes => {
    const receitasAjustadas =
      mes.receitas * (1 + config.ajusteReceita);
    const despesasAjustadas =
      mes.despesas * (1 + config.ajusteDespesa);

    return {
      ...mes,
      receitas: receitasAjustadas,
      despesas: despesasAjustadas,
      saldo: receitasAjustadas - despesasAjustadas
    };
  });
}

/* =========================
   CARTÃO DE CRÉDITO
========================= */

/**
 * Retorna parcelas de uma compra no cartão
 */
function calcularParcelasCompra(compra) {
  const valorParcela = compra.valorTotal / compra.parcelas;
  let parcelas = [];

  const dataInicial = new Date(compra.dataCompra);

  for (let i = 0; i < compra.parcelas; i++) {
    let dataParcela = new Date(
      dataInicial.getFullYear(),
      dataInicial.getMonth() + i,
      1
    );

    parcelas.push({
      cartaoId: compra.cartaoId,
      valor: valorParcela,
      mes: dataParcela.getMonth(),
      ano: dataParcela.getFullYear()
    });
  }

  return parcelas;
}

/**
 * Retorna gasto total em cartão por mês
 */
function calcularGastoCartaoMes(mes, ano) {
  let total = 0;

  state.comprasCartao.forEach(compra => {
    const parcelas = calcularParcelasCompra(compra);
    parcelas.forEach(p => {
      if (p.mes === mes && p.ano === ano) {
        total += p.valor;
      }
    });
  });

  return total;
}

/* =========================
   DÍVIDAS
========================= */

/**
 * Calcula valor mensal de uma dívida
 */
function calcularParcelaDivida(divida) {
  if (!divida.parcelas || divida.parcelas === 0) return 0;
  return divida.valorTotal / divida.parcelas;
}

/**
 * Retorna impacto mensal das dívidas
 */
function calcularDividasMes(mes, ano) {
  let total = 0;

  state.dividas.forEach(d => {
    const inicio = new Date(d.dataInicio);
    const fim = new Date(d.dataQuitacaoDesejada);
    const dataAtual = new Date(ano, mes, 1);

    if (dataAtual >= inicio && dataAtual <= fim) {
      total += calcularParcelaDivida(d);
    }
  });

  return total;
}

/* =========================
   ASSINATURAS
========================= */

/**
 * Retorna total gasto com assinaturas no mês
 */
function calcularAssinaturasMes() {
  let total = 0;

  state.assinaturas.forEach(a => {
    if (a.status === "ativa") {
      total += a.valorMensal;
    }
  });

  return total;
}

/* =========================
   SCORE FINANCEIRO
========================= */

/**
 * Calcula score financeiro simples (0–100)
 */
function calcularScoreFinanceiro() {
  const mes = calcularMesAtual();

  let score = 100;

  if (mes.saldo < 0) score -= 30;
  if (mes.comprometido > mes.receitas * 0.5) score -= 20;
  if (mes.despesas > mes.receitas) score -= 20;

  return Math.max(score, 0);
}
