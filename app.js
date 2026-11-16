// Exercícios 7, 8 e 9 — catálogo na página, pesquisa, formulário e dados guardados

const lista = document.querySelector("#lista-livros");
const resumo = document.querySelector("#resumo");
const pesquisa = document.querySelector("#pesquisa");
const botaoDisponiveis = document.querySelector("#so-disponiveis");
const botaoTema = document.querySelector("#tema");
const form = document.querySelector("#inscricao");
const mensagem = document.querySelector("#mensagem");

let catalogo = [];
let soDisponiveis = false;
let favoritos = lerFavoritos();

// ---------- Exercício 9: localStorage ----------

function lerFavoritos() {
  try {
    return JSON.parse(localStorage.getItem("favoritos")) ?? [];
  } catch {
    return [];
  }
}

function guardarFavoritos() {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function alternarFavorito(titulo) {
  if (favoritos.includes(titulo)) {
    favoritos = favoritos.filter(t => t !== titulo);
  } else {
    favoritos.push(titulo);
  }
  guardarFavoritos();
  atualizar();
}

function aplicarTema(escuro) {
  document.body.classList.toggle("escuro", escuro);
  botaoTema.textContent = escuro ? "Modo claro" : "Modo escuro";
}

aplicarTema(localStorage.getItem("tema") === "escuro");

botaoTema.addEventListener("click", () => {
  const escuro = !document.body.classList.contains("escuro");
  aplicarTema(escuro);
  localStorage.setItem("tema", escuro ? "escuro" : "claro");
});

// ---------- Exercício 7: desenhar o catálogo ----------

function criarItem(livro) {
  const item = document.createElement("li");

  const info = document.createElement("span");
  info.className = "info";
  info.textContent = `${livro.titulo} — ${livro.autor} (${livro.ano})`;
  item.append(info);

  const direita = document.createElement("span");

  if (!livro.disponivel) {
    item.classList.add("indisponivel");
    const estado = document.createElement("span");
    estado.className = "estado";
    estado.textContent = "emprestado ";
    direita.append(estado);
  }

  const guardado = favoritos.includes(livro.titulo);
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "fav";
  botao.textContent = guardado ? "Guardado" : "Guardar";
  botao.setAttribute("aria-pressed", String(guardado));
  botao.addEventListener("click", () => alternarFavorito(livro.titulo));
  direita.append(botao);

  item.append(direita);
  return item;
}

function mostrarLivros(livros) {
  lista.replaceChildren();

  if (livros.length === 0) {
    const vazio = document.createElement("li");
    vazio.textContent = "Nenhum livro encontrado.";
    lista.append(vazio);
    return;
  }

  for (const livro of livros) {
    lista.append(criarItem(livro));
  }
}

function atualizarResumo() {
  const n = catalogo.filter(l => l.disponivel).length;
  resumo.textContent = `${catalogo.length} livros, ${n} disponíveis`;
}

// ---------- Exercício 8: pesquisa e filtro ----------

function atualizar() {
  const texto = pesquisa.value.trim().toLowerCase();
  let resultado = catalogo.filter(l => l.titulo.toLowerCase().includes(texto));
  if (soDisponiveis) {
    resultado = resultado.filter(l => l.disponivel);
  }
  mostrarLivros(resultado);
  atualizarResumo();
}

pesquisa.addEventListener("input", atualizar);

botaoDisponiveis.addEventListener("click", () => {
  soDisponiveis = !soDisponiveis;
  botaoDisponiveis.setAttribute("aria-pressed", String(soDisponiveis));
  atualizar();
});

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nome = form.elements.nome.value.trim();
  const email = form.elements.email.value.trim();

  if (nome === "" || !email.includes("@")) {
    mensagem.className = "erro";
    mensagem.textContent = "Preencha o nome e um e-mail válido.";
    return;
  }
  mensagem.className = "sucesso";
  mensagem.textContent = `Obrigado, ${nome}! Inscrição feita.`;
  form.reset();
});

// ---------- Exercício 9: carregar o JSON ----------

async function carregarLivros() {
  try {
    const resposta = await fetch("livros.json");
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    catalogo = await resposta.json();
    atualizar();
  } catch (erro) {
    resumo.textContent = "";
    lista.replaceChildren();
    const aviso = document.createElement("li");
    aviso.textContent = "Não foi possível carregar o catálogo.";
    lista.append(aviso);
  }
}

carregarLivros();
