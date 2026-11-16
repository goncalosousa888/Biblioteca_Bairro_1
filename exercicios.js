// Autor: [o teu nome]
// Exercícios 1 a 6 · mostram o resultado na página (exercicios.html) e na consola.
// Também correm no terminal:  node exercicios.js
// Está tudo dentro de uma função para não chocar com as variáveis do app.js.

(function () {
  const NO_BROWSER = typeof document !== "undefined";
  let saida = null;

  // Escolhe a secção onde os resultados vão aparecer
  function secao(numero, titulo) {
    console.log(`\n=== Exercício 0${numero} · ${titulo} ===`);
    saida = NO_BROWSER ? document.querySelector(`#ex${numero} .saida`) : null;
  }

  // Escreve na consola e, se existir, na página
  function escrever(...partes) {
    const texto = partes
      .map(p => (Array.isArray(p) ? `[${p.join(", ")}]` : String(p)))
      .join(" ");
    console.log(texto);
    if (saida !== null) {
      const linha = document.createElement("li");
      linha.textContent = texto;
      saida.append(linha);
    }
  }

  // ═════════════════════════════════════════════════════════
  // EXERCÍCIO 01 · Olá, consola
  // ═════════════════════════════════════════════════════════
  secao(1, "Olá, consola");
  escrever("Olá, Biblioteca do Bairro!");                          // 02 · boas-vindas
  escrever("A biblioteca abriu há", 2026 - 1987, "anos.");         // 03 · 2026 - 1987 = 39

  // 05 · erro de propósito: console.lg não existe
  try {
    console.lg("teste");
  } catch (erro) {
    escrever("Erro lido:", erro.message);                          // console.lg is not a function
  }

  // ═════════════════════════════════════════════════════════
  // EXERCÍCIO 02 · Os dados da biblioteca
  // ═════════════════════════════════════════════════════════
  secao(2, "Os dados da biblioteca");
  const nome = "Biblioteca do Bairro";
  const morada = "Rua das Flores, 12, Porto";   // morada de exemplo
  let livrosDisponiveis = 1250;

  // 03 · três empréstimos: diminuir a variável e mostrá-la
  livrosDisponiveis = livrosDisponiveis - 1;
  escrever("Após 1.º empréstimo:", livrosDisponiveis);
  livrosDisponiveis = livrosDisponiveis - 1;
  escrever("Após 2.º empréstimo:", livrosDisponiveis);
  livrosDisponiveis = livrosDisponiveis - 1;
  escrever("Após 3.º empréstimo:", livrosDisponiveis);             // 1247, calculado

  // 04 · template literal
  escrever(`A ${nome} tem ${livrosDisponiveis} livros disponíveis.`);

  // 05 · typeof de cada variável e o nome em maiúsculas
  escrever(`typeof nome: ${typeof nome} · typeof morada: ${typeof morada} · typeof livrosDisponiveis: ${typeof livrosDisponiveis}`);
  escrever(nome.toUpperCase());

  // ═════════════════════════════════════════════════════════
  // EXERCÍCIO 03 · Aberta ou fechada?
  // ═════════════════════════════════════════════════════════
  secao(3, "Aberta ou fechada?");
  function verificarHorario(dia, hora) {
    const diasUteis = ["segunda", "terça", "quarta", "quinta", "sexta"];
    const aberta =
      (diasUteis.includes(dia) && hora >= 9 && hora < 19) ||
      (dia === "sábado" && hora >= 10 && hora < 13);
    return aberta ? "Aberta" : "Fechada";
  }

  // 05 · pelo menos quatro combinações
  escrever("quarta, 18h →", verificarHorario("quarta", 18));       // Aberta
  escrever("quarta, 19h →", verificarHorario("quarta", 19));       // Fechada (19 h em ponto)
  escrever("sábado, 11h →", verificarHorario("sábado", 11));       // Aberta
  escrever("sábado, 14h →", verificarHorario("sábado", 14));       // Fechada
  escrever("domingo, 11h →", verificarHorario("domingo", 11));     // Fechada

  // ═════════════════════════════════════════════════════════
  // EXERCÍCIO 04 · Funções da biblioteca
  // ═════════════════════════════════════════════════════════
  secao(4, "Funções da biblioteca");

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
  escrever("calcularMulta(10), (22), (30) →", calcularMulta(10), calcularMulta(22), calcularMulta(30));
  escrever("estaAberta('domingo', 11) →", estaAberta("domingo", 11));
  escrever("estaAberta('sexta', 9) →", estaAberta("sexta", 9));
  escrever("estaAberta('sábado', 12) →", estaAberta("sábado", 12));
  escrever("formatarEuros(3.5), (0), (12.345) →", formatarEuros(3.5), formatarEuros(0), formatarEuros(12.345));
  escrever("mensagemMulta(10) →", mensagemMulta(10));
  escrever("mensagemMulta(22) →", mensagemMulta(22));
  escrever("mensagemMulta(30) →", mensagemMulta(30));

  // ═════════════════════════════════════════════════════════
  // EXERCÍCIO 05 · Lista de leituras
  // ═════════════════════════════════════════════════════════
  secao(5, "Lista de leituras");
  const leituras = ["Os Maias", "Mensagem", "A Sibila", "Memorial do Convento", "Amor de Perdição"];

  leituras.push("Os Lusíadas", "Ensaio sobre a Cegueira");
  escrever(`Tenho ${leituras.length} livros na lista.`);

  for (let i = 0; i < leituras.length; i++) {
    escrever(`${i + 1}. ${leituras[i]}`);          // numeração a começar em 1
  }

  const titulosLongos = leituras.filter(t => t.length > 10);
  escrever("Mais de 10 letras:", titulosLongos);

  const emMaiusculas = leituras.map(t => t.toUpperCase());
  escrever("Em maiúsculas:", emMaiusculas);
  escrever("Original intacto:", leituras.length, "títulos");

  // ═════════════════════════════════════════════════════════
  // EXERCÍCIO 06 · O catálogo em objetos
  // ═════════════════════════════════════════════════════════
  secao(6, "O catálogo em objetos");

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
    escrever(`${livro.titulo} — ${livro.autor} (${livro.ano})`);
  }

  // 03 · quantos estão disponíveis (calculado: muda se mudares o array)
  function contarDisponiveis() {
    return catalogo.filter(l => l.disponivel).length;
  }
  escrever(`Disponíveis: ${contarDisponiveis()} de ${catalogo.length}`);

  // 04 · o mais antigo
  let maisAntigo = catalogo[0];
  for (const livro of catalogo) {
    if (livro.ano < maisAntigo.ano) {
      maisAntigo = livro;
    }
  }
  escrever(`Mais antigo: ${maisAntigo.titulo} — ${maisAntigo.autor} (${maisAntigo.ano})`);

  // 05 · emprestar(titulo)
  function emprestar(titulo) {
    const livro = catalogo.find(l => l.titulo.toLowerCase() === titulo.toLowerCase());
    if (livro === undefined) {
      escrever(`Aviso: "${titulo}" não existe no catálogo.`);
    } else if (!livro.disponivel) {
      escrever(`Aviso: "${livro.titulo}" já está emprestado.`);
    } else {
      livro.disponivel = false;
      escrever(`"${livro.titulo}" foi emprestado.`);
    }
  }

  emprestar("Os Maias");                 // emprestado
  emprestar("Os Maias");                 // aviso: já emprestado
  emprestar("Ensaio sobre a Cegueira");  // aviso: não existe
  escrever(`Disponíveis agora: ${contarDisponiveis()} de ${catalogo.length}`);
})();
