// Autor: [o teu nome]
// Biblioteca do Bairro · app.js (partilhado por index.html e catalogo.html)

// ── Exercício 01 · mensagem de boas-vindas e anos de existência ─────────────
console.log("Olá, Biblioteca do Bairro!");
console.log(`A biblioteca abriu há ${new Date().getFullYear() - 1987} anos.`);

// ── Horário (exercícios 3 e 4) ───────────────────────────────────────────────
const NOMES_DOS_DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

function estaAberta(dia, hora) {
  const diasUteis = ["segunda", "terça", "quarta", "quinta", "sexta"];
  if (diasUteis.includes(dia)) {
    return hora >= 9 && hora < 19;
  }
  if (dia === "sábado") {
    return hora >= 10 && hora < 13;
  }
  return false;
}

function mostrarEstado() {
  const estado = document.querySelector("#estado");
  if (estado === null) return;

  const agora = new Date();
  const aberta = estaAberta(NOMES_DOS_DIAS[agora.getDay()], agora.getHours());
  estado.textContent = aberta ? "Aberta agora" : "Fechada agora";
  estado.classList.toggle("aberta", aberta);
  estado.classList.toggle("fechada", !aberta);
}

// ── Exercício 09 · modo escuro lembrado com localStorage ─────────────────────
function aplicarTema(escuro) {
  const botao = document.querySelector("#tema");
  document.body.classList.toggle("escuro", escuro);
  if (botao !== null) {
    botao.setAttribute("aria-pressed", String(escuro));
    botao.textContent = escuro ? "Modo claro" : "Modo escuro";
  }
}

function iniciarTema() {
  const botao = document.querySelector("#tema");
  if (botao === null) return;

  aplicarTema(localStorage.getItem("tema") === "escuro");
  botao.addEventListener("click", () => {
    const escuro = !document.body.classList.contains("escuro");
    aplicarTema(escuro);
    localStorage.setItem("tema", escuro ? "escuro" : "claro");
  });
}

// ── Favoritos (exercício 9) ──────────────────────────────────────────────────
function lerFavoritos() {
  try {
    return JSON.parse(localStorage.getItem("favoritos")) ?? [];
  } catch (erro) {
    return [];
  }
}

function guardarFavoritos(favoritos) {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function alternarFavorito(titulo) {
  const favoritos = lerFavoritos();
  const novos = favoritos.includes(titulo)
    ? favoritos.filter(t => t !== titulo)
    : [...favoritos, titulo];
  guardarFavoritos(novos);
  return novos.includes(titulo);
}

function atualizarBotaoFavorito(botao, guardado) {
  botao.textContent = guardado ? "Guardado ✓" : "Guardar";
  botao.setAttribute("aria-pressed", String(guardado));
}

// ── Catálogo (exercícios 7, 8 e 9) ───────────────────────────────────────────
let catalogo = [];            // vem de livros.json
let termoPesquisa = "";
let apenasDisponiveis = false;

function normalizar(texto) {
  // minúsculas e sem acentos: «eca» encontra «Eça»
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function filtrarLivros() {
  const termo = normalizar(termoPesquisa.trim());
  return catalogo.filter(livro => {
    const passaDisponivel = !apenasDisponiveis || livro.disponivel;
    const passaPesquisa = normalizar(`${livro.titulo} ${livro.autor}`).includes(termo);
    return passaDisponivel && passaPesquisa;
  });
}

function criarItem(livro) {
  const item = document.createElement("li");

  const texto = document.createElement("span");
  texto.className = "texto";
  texto.textContent = `${livro.titulo} — ${livro.autor} (${livro.ano})`;
  item.append(texto);

  if (!livro.disponivel) {
    item.classList.add("indisponivel");
    const etiqueta = document.createElement("span");
    etiqueta.className = "etiqueta";
    etiqueta.textContent = "emprestado";
    item.append(etiqueta);
  }

  const botao = document.createElement("button");
  botao.type = "button";
  atualizarBotaoFavorito(botao, lerFavoritos().includes(livro.titulo));
  botao.addEventListener("click", () => {
    atualizarBotaoFavorito(botao, alternarFavorito(livro.titulo));
  });
  item.append(botao);

  return item;
}

function mostrarLivros(livros) {
  const lista = document.querySelector("#lista-livros");
  lista.replaceChildren();

  if (livros.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "vazio";
    vazio.textContent = "Nenhum livro encontrado";
    lista.append(vazio);
    return;
  }

  for (const livro of livros) {
    lista.append(criarItem(livro));
  }
}

function mostrarResumo() {
  const disponiveis = catalogo.filter(l => l.disponivel).length;
  document.querySelector("#resumo").textContent =
    `${catalogo.length} livros, ${disponiveis} disponíveis`;
}

function atualizarLista() {
  mostrarLivros(filtrarLivros());
}

async function carregarLivros() {
  const erro = document.querySelector("#erro-catalogo");
  const resumo = document.querySelector("#resumo");
  try {
    const resposta = await fetch("livros.json");
    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`);
    }
    catalogo = await resposta.json();
    erro.textContent = "";
    mostrarResumo();
    atualizarLista();
  } catch (e) {
    console.error("Falha ao carregar livros.json:", e);
    resumo.textContent = "Catálogo indisponível";
    erro.textContent = "Não foi possível carregar o catálogo.";
  }
}

function iniciarPesquisa() {
  const pesquisa = document.querySelector("#pesquisa");
  const botaoFiltro = document.querySelector("#so-disponiveis");

  pesquisa.addEventListener("input", () => {
    termoPesquisa = pesquisa.value;
    atualizarLista();
  });

  botaoFiltro.addEventListener("click", () => {
    apenasDisponiveis = !apenasDisponiveis;
    botaoFiltro.setAttribute("aria-pressed", String(apenasDisponiveis));
    atualizarLista();
  });
}

// ── Formulário de inscrição (exercício 8) ────────────────────────────────────
function emailValido(email) {
  const arroba = email.indexOf("@");
  return arroba > 0 && email.indexOf(".", arroba) > arroba + 1 && !email.endsWith(".");
}

function iniciarFormulario() {
  const form = document.querySelector("#inscricao");
  const mensagem = document.querySelector("#mensagem");

  function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
  }

  form.addEventListener("submit", evento => {
    evento.preventDefault();               // não recarregar a página
    const nome = form.elements.nome.value.trim();
    const email = form.elements.email.value.trim();

    form.elements.nome.classList.toggle("invalido", nome === "");
    form.elements.email.classList.toggle("invalido", !emailValido(email));

    if (nome === "") {
      mostrarMensagem("Preencha o nome.", "erro");
      return;
    }
    if (!emailValido(email)) {
      mostrarMensagem("Preencha um e-mail válido, por exemplo ana@exemplo.pt.", "erro");
      return;
    }
    mostrarMensagem(`Obrigado, ${nome}! Inscrição feita.`, "sucesso");
    form.reset();
  });
}

// ── Arranque ─────────────────────────────────────────────────────────────────
iniciarTema();
mostrarEstado();

if (document.querySelector("#lista-livros") !== null) {
  iniciarPesquisa();
  iniciarFormulario();
  carregarLivros();
}
