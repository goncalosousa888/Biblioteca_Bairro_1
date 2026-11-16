// Autor: [o teu nome]
// Exercícios 1 a 6 · corre na consola do browser ou com:  node exercicios-1-6.js
// (Os exercícios 7, 8 e 9 estão no site: catalogo.html + app.js + livros.json)

// ═══════════════════════════════════════════════════════════
// EXERCÍCIO 01 · Olá, consola
// ═══════════════════════════════════════════════════════════
console.log("\n=== Exercício 01 ===");
console.log("Olá, Biblioteca do Bairro!");                       // 02 · boas-vindas
console.log("A biblioteca abriu há", 2026 - 1987, "anos.");     // 03 · 2026 - 1987 = 39

// 05 · erro de propósito: console.lg não existe
try {
  console.lg("teste");
} catch (erro) {
  console.log("Erro lido:", erro.message);   // console.lg is not a function
}

// ═══════════════════════════════════════════════════════════
// EXERCÍCIO 02 · Os dados da biblioteca
// ═══════════════════════════════════════════════════════════
console.log("\n=== Exercício 02 ===");
const nome = "Biblioteca do Bairro";
const morada = "Rua das Flores, 12, Porto";   // morada de exemplo
let livrosDisponiveis = 1250;

// 03 · três empréstimos: diminuir a variável e mostrá-la
livrosDisponiveis = livrosDisponiveis - 1;
console.log(livrosDisponiveis);
livrosDisponiveis = livrosDisponiveis - 1;
console.log(livrosDisponiveis);
livrosDisponiveis = livrosDisponiveis - 1;
console.log(livrosDisponiveis);                // 1247, calculado

// 04 · template literal
console.log(`A ${nome} tem ${livrosDisponiveis} livros disponíveis.`);

// 05 · typeof de cada variável e o nome em maiúsculas
console.log(typeof nome, typeof morada, typeof livrosDisponiveis);
console.log(nome.toUpperCase());

// ═══════════════════════════════════════════════════════════
// EXERCÍCIO 03 · Aberta ou fechada?
// ═══════════════════════════════════════════════════════════
console.log("\n=== Exercício 03 ===");
function verificarHorario(dia, hora) {
  const diasUteis = ["segunda", "terça", "quarta", "quinta", "sexta"];
  const aberta =
    (diasUteis.includes(dia) && hora >= 9 && hora < 19) ||
    (dia === "sábado" && hora >= 10 && hora < 13);
  return aberta ? "Aberta" : "Fechada";
}

// 05 · pelo menos quatro combinações
console.log("quarta 18h →", verificarHorario("quarta", 18));   // Aberta
console.log("quarta 19h →", verificarHorario("quarta", 19));   // Fechada (19 h em ponto)
console.log("sábado 11h →", verificarHorario("sábado", 11));   // Aberta
console.log("sábado 14h →", verificarHorario("sábado", 14));   // Fechada
console.log("domingo 11h →", verificarHorario("domingo", 11)); // Fechada

// ═══════════════════════════════════════════════════════════
// EXERCÍCIO 04 · Funções da biblioteca
// ═══════════════════════════════════════════════════════════
console.log("\n=== Exercício 04 ===");

// 01 · 0,50 € por dia a partir do 16.º dia (prazo de 15 dias)
function calcularMulta(dias) {
  const prazo = 15;
  if (dias <= prazo) {
    return 0;
  }
  return (dias - prazo) * 0.5;
}

// 02 · a lógica do exercício 3, a devolver true ou false
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

// 03 · «3,50 €»
function formatarEuros(valor) {
  return `${valor.toFixed(2).replace(".", ",")} €`;
}

// 04 · usa as outras duas funções
function mensagemMulta(dias) {
  const multa = calcularMulta(dias);
  if (multa === 0) {
    return "Sem multa";
  }
  return `Multa a pagar: ${formatarEuros(multa)}`;
}

// 05 · três valores diferentes por função
console.log(calcularMulta(10), calcularMulta(22), calcularMulta(30));       // 0 3.5 7.5
console.log(estaAberta("domingo", 11), estaAberta("sexta", 9), estaAberta("sábado", 12)); // false true true
console.log(formatarEuros(3.5), formatarEuros(0), formatarEuros(12.345));
console.log(mensagemMulta(10), "|", mensagemMulta(22), "|", mensagemMulta(30));

// ═══════════════════════════════════════════════════════════
// EXERCÍCIO 05 · Lista de leituras
// ═══════════════════════════════════════════════════════════
console.log("\n=== Exercício 05 ===");
const leituras = ["Os Maias", "Mensagem", "A Sibila", "Memorial do Convento", "Amor de Perdição"];

leituras.push("Os Lusíadas", "Ensaio sobre a Cegueira");
console.log(`Tenho ${leituras.length} livros na lista.`);

for (let i = 0; i < leituras.length; i++) {
  console.log(`${i + 1}. ${leituras[i]}`);       // numeração a começar em 1
}

const tituloLongos = leituras.filter(t => t.length > 10);
console.log("Mais de 10 letras:", tituloLongos);

const emMaiusculas = leituras.map(t => t.toUpperCase());
console.log("Em maiúsculas:", emMaiusculas);
console.log("Original intacto:", leituras.length, "títulos");

// ═══════════════════════════════════════════════════════════
// EXERCÍCIO 06 · O catálogo em objetos
// ═══════════════════════════════════════════════════════════
console.log("\n=== Exercício 06 ===");

// 01 · seis livros
const catalogo = [
  { titulo: "Os Maias", autor: "Eça de Queirós", ano: 1888, disponivel: true },
  { titulo: "Memorial do Convento", autor: "José Saramago", ano: 1982, disponivel: false },
  { titulo: "Mensagem", autor: "Fernando Pessoa", ano: 1934, disponivel: true },
  { titulo: "Livro do Desassossego", autor: "Fernando Pessoa", ano: 1982, disponivel: true },
  { titulo: "Amor de Perdição", autor: "Camilo Castelo Branco", ano: 1862, disponivel: false },
  { titulo: "A Cidade e as Serras", autor: "Eça de Queirós", ano: 1901, disponivel: true },
];

// 02 · «Título — Autor (ano)»
for (const livro of catalogo) {
  console.log(`${livro.titulo} — ${livro.autor} (${livro.ano})`);
}

// 03 · quantos estão disponíveis (calculado, muda se mudares o array)
function contarDisponiveis() {
  return catalogo.filter(l => l.disponivel).length;
}
console.log(`Disponíveis: ${contarDisponiveis()} de ${catalogo.length}`);

// 04 · o mais antigo
let maisAntigo = catalogo[0];
for (const livro of catalogo) {
  if (livro.ano < maisAntigo.ano) {
    maisAntigo = livro;
  }
}
console.log(`Mais antigo: ${maisAntigo.titulo} — ${maisAntigo.autor} (${maisAntigo.ano})`);

// 05 · emprestar(titulo)
function emprestar(titulo) {
  const livro = catalogo.find(l => l.titulo.toLowerCase() === titulo.toLowerCase());
  if (livro === undefined) {
    console.log(`Aviso: "${titulo}" não existe no catálogo.`);
  } else if (!livro.disponivel) {
    console.log(`Aviso: "${livro.titulo}" já está emprestado.`);
  } else {
    livro.disponivel = false;
    console.log(`"${livro.titulo}" foi emprestado.`);
  }
}

emprestar("Os Maias");                 // emprestado
emprestar("Os Maias");                 // aviso: já emprestado
emprestar("Ensaio sobre a Cegueira");  // aviso: não existe
console.log(`Disponíveis agora: ${contarDisponiveis()} de ${catalogo.length}`);
