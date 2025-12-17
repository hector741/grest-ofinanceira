document.addEventListener("DOMContentLoaded", () => {

  /* ===== LOGIN ===== */
  const usuario = localStorage.getItem("usuarioLogado");
  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  const STORAGE_KEY = `dados_${usuario}`;
  let dados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { lancamentos: [] };
  let lancamentos = dados.lancamentos;

  /* ===== CATEGORIAS ===== */
  const categorias = {
    receita: ["Salário", "Freelance", "Investimentos", "Outros"],
    despesa: ["Alimentação", "Moradia", "Transporte", "Lazer", "Outros"]
  };

  const tipo = document.getElementById("tipo");
  const categoria = document.getElementById("categoria");

  function atualizarCategorias() {
    categoria.innerHTML = "";
    categorias[tipo.value].forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      categoria.appendChild(opt);
    });
  }

  tipo.addEventListener("change", atualizarCategorias);
  atualizarCategorias();

  /* ===== FORM ===== */
  document.getElementById("formLancamento").addEventListener("submit", e => {
    e.preventDefault();

    const valor = parseFloat(
      document.getElementById("valor").value.replace(",", ".")
    );

    if (isNaN(valor)) return;

    lancamentos.push({
      data: data.value,
      descricao: descricao.value,
      tipo: tipo.value,
      categoria: categoria.value,
      fixo: fixo.value,
      valor
    });

    salvar();
    e.target.reset();
    atualizarCategorias();
    render();
  });

  function salvar() {
    dados.lancamentos = lancamentos;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
  }

  /* ===== RENDER ===== */
  function render() {
    let r = 0, d = 0;
    const tbody = document.getElementById("listaLancamentos");
    tbody.innerHTML = "";

    lancamentos.forEach(l => {
      l.tipo === "receita" ? r += l.valor : d += l.valor;
      tbody.innerHTML += `
        <tr>
          <td>${l.data}</td>
          <td>${l.descricao}</td>
          <td>${l.tipo}</td>
          <td>${l.categoria}</td>
          <td>${l.fixo}</td>
          <td>R$ ${l.valor.toFixed(2)}</td>
        </tr>`;
    });

    dashReceitas.textContent = `R$ ${r.toFixed(2)}`;
    dashDespesas.textContent = `R$ ${d.toFixed(2)}`;
    dashSaldo.textContent = `R$ ${(r - d).toFixed(2)}`;

    renderPlanejamento();
  }

  /* ===== PLANEJAMENTO ===== */
  const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

  function renderPlanejamento() {
    const tbody = document.getElementById("tabelaPlanejamento");
    tbody.innerHTML = "";

    const plano = meses.map(m => ({ m, r:0, f:0, v:0 }));

    lancamentos.forEach(l => {
      const i = new Date(l.data).getMonth();
      if (l.tipo === "receita") {
        l.fixo === "fixa"
          ? plano.slice(i).forEach(p => p.r += l.valor)
          : plano[i].r += l.valor;
      } else {
        l.fixo === "fixa"
          ? plano.slice(i).forEach(p => p.f += l.valor)
          : plano[i].v += l.valor;
      }
    });

    plano.forEach(p => {
      const saldo = p.r - p.f - p.v;
      tbody.innerHTML += `
        <tr>
          <td>${p.m}</td>
          <td>R$ ${p.r.toFixed(2)}</td>
          <td>R$ ${p.f.toFixed(2)}</td>
          <td>R$ ${p.v.toFixed(2)}</td>
          <td style="color:${saldo < 0 ? 'red':'green'}">
            R$ ${saldo.toFixed(2)}
          </td>
        </tr>`;
    });
  }

  /* ===== ABAS ===== */
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  render();
});
