const MESES = [
  "Jan","Fev","Mar","Abr","Mai","Jun",
  "Jul","Ago","Set","Out","Nov","Dez"
];

function calcularPlanejamento(lancamentos) {
  const plano = MESES.map(m => ({
    mes: m,
    receitas: 0,
    fixos: 0,
    variaveis: 0,
    saldo: 0
  }));

  lancamentos.forEach(l => {
    const mes = new Date(l.data).getMonth();

    if (l.tipo === "receita") {
      l.fixo === "fixa"
        ? plano.slice(mes).forEach(m => m.receitas += l.valor)
        : plano[mes].receitas += l.valor;
    }

    if (l.tipo === "despesa") {
      l.fixo === "fixa"
        ? plano.slice(mes).forEach(m => m.fixos += l.valor)
        : plano[mes].variaveis += l.valor;
    }
  });

  plano.forEach(m => {
    m.saldo = m.receitas - m.fixos - m.variaveis;
  });

  return plano;
}
