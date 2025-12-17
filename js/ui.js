let lancamentos = dadosUsuario.lancamentos || [];

function renderDashboard() {
  let receitas = 0, despesas = 0;

  lancamentos.forEach(l => {
    l.tipo === "receita"
      ? receitas += l.valor
      : despesas += l.valor;
  });

  document.getElementById("dashReceitas").innerText = `R$ ${receitas.toFixed(2)}`;
  document.getElementById("dashDespesas").innerText = `R$ ${despesas.toFixed(2)}`;
  document.getElementById("dashSaldo").innerText = `R$ ${(receitas-despesas).toFixed(2)}`;
}

function renderLancamentos() {
  const tbody = document.getElementById("listaLancamentos");
  tbody.innerHTML = "";

  lancamentos.forEach(l => {
    tbody.innerHTML += `
      <tr>
        <td>${l.data}</td>
        <td>${l.descricao}</td>
        <td>${l.tipo}</td>
        <td>${l.fixo}</td>
        <td>R$ ${l.valor.toFixed(2)}</td>
      </tr>
    `;
  });
}

function renderPlanejamento() {
  const plano = calcularPlanejamento(lancamentos);
  const tbody = document.getElementById("tabelaPlanejamento");
  tbody.innerHTML = "";

  plano.forEach(m => {
    tbody.innerHTML += `
      <tr>
        <td>${m.mes}</td>
        <td class="text-green">R$ ${m.receitas.toFixed(2)}</td>
        <td class="text-red">R$ ${m.fixos.toFixed(2)}</td>
        <td class="text-red">R$ ${m.variaveis.toFixed(2)}</td>
        <td class="${m.saldo<0?'text-red':'text-green'}">
          R$ ${m.saldo.toFixed(2)}
        </td>
      </tr>
    `;
  });
}

function updateApp() {
  renderDashboard();
  renderLancamentos();
  renderPlanejamento();
}
