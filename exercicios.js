// Autor: [o teu nome]
// Exercícios 1 a 6, interativos · usados por exercicios.html
// Está tudo dentro de uma função para não chocar com as variáveis do app.js.

(function () {
  const $ = seletor => document.querySelector(seletor);

  // Escreve um texto num elemento; "tipo" pode ser "ok" ou "aviso" (cor)
  function escrever(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.classList.remove("ok", "aviso");
    if (tipo) elemento.classList.add(tipo);
  }

  // Cria um <li> com texto (sem innerHTML)
  function criarLi(texto) {
    const li = document.createElement("li");
    li.textContent = texto;
    return li;
  }

  const DIAS = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"];

  function preencherDias(select, valorInicial) {
    for (const dia of DIAS) {
      const opcao = document.createElement("option");
      opcao.value = dia;
      opcao.textContent = dia;
      select.append(opcao);
    }
    select.value = valorInicial;
  }

  // ═════════════════════════════════════════════════════════
  // EXERCÍCIO 01 · Olá, consola
  // ═════════════════════════════════════════════════════════
  function iniciarEx1() {
    const mensagem = $("#ex1-msg");

    $("#ex1-saudar").addEventListener("click", () => {
      escrever(mensagem, "Olá, Biblioteca do Bairro!", "ok");       // boas-vindas
    });

    // 05 · erro de propósito: console.lg não existe
    $("#ex1-erro").addEventListener("click", () => {
      try {
        console.lg("teste");
      } catch (erro) {
        escrever(mensagem, `Erro lido: ${erro.message}`, "aviso");   // console.lg is not a function
      }
    });

    // 03 · há quantos anos abriu (2026 - 1987 = 39)
    const campoAno = $("#ex1-ano");
    function atualizarAnos() {
      const ano = Number(campoAno.value);
      if (campoAno.value === "" || Number.isNaN(ano)) {
        escrever($("#ex1-anos"), "Escreva um ano.", "aviso");
        return;
      }
      const anos = new Date().getFullYear() - ano;
      escrever($("#ex1-anos"), `A biblioteca abriu há ${anos} anos.`, "ok");
    }
    campoAno.addEventListener("input", atualizarAnos);
    atualizarAnos();
  }

  // ═════════════════════════════════════════════════════════
  // EXERCÍCIO 02 · Os dados da biblioteca
  // ═════════════════════════════════════════════════════════
  function iniciarEx2() {
    const nome = "Biblioteca do Bairro";
    const morada = "Rua das Flores, 12, Porto";   // morada de exemplo
    const INICIAL = 1250;
    let livrosDisponiveis = INICIAL;

    function mostrar() {
      escrever($("#ex2-dados"), `${nome} · ${morada}`);
      // 04 · template literal, com o número calculado
      escrever($("#ex2-frase"), `A ${nome} tem ${livrosDisponiveis} livros disponíveis.`, "ok");

      // 05 · typeof de cada variável e o nome em maiúsculas
      const tipos = $("#ex2-tipos");
      tipos.replaceChildren(
        criarLi(`nome: ${typeof nome}`),
        criarLi(`morada: ${typeof morada}`),
        criarLi(`livrosDisponiveis: ${typeof livrosDisponiveis}`),
        criarLi(`Nome em maiúsculas: ${nome.toUpperCase()}`)
      );
      $("#ex2-emprestar").disabled = livrosDisponiveis === 0;
    }

    // 03 · cada clique é um empréstimo: diminui a variável
    $("#ex2-emprestar").addEventListener("click", () => {
      livrosDisponiveis = livrosDisponiveis - 1;
      mostrar();
    });
    $("#ex2-repor").addEventListener("click", () => {
      livrosDisponiveis = INICIAL;
      mostrar();
    });
    mostrar();
  }

  // ═════════════════════════════════════════════════════════
  // Funções partilhadas pelos exercícios 3 e 4
  // ═════════════════════════════════════════════════════════
  // 02 do ex. 4 · a lógica do ex. 3, a devolver true ou false
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

  // 01 do ex. 4 · 0,50 € por dia a partir do 16.º dia (prazo de 15 dias)
  function calcularMulta(dias) {
    const prazo = 15;
    if (dias <= prazo) {
      return 0;
    }
    return (dias - prazo) * 0.5;
  }

  // 03 do ex. 4 · «3,50 €»
  function formatarEuros(valor) {
    return `${valor.toFixed(2).replace(".", ",")} €`;
  }

  // 04 do ex. 4 · usa as outras duas funções
  function mensagemMulta(dias) {
    const multa = calcularMulta(dias);
    if (multa === 0) {
      return "Sem multa";
    }
    return `Multa a pagar: ${formatarEuros(multa)}`;
  }

  // ═════════════════════════════════════════════════════════
  // EXERCÍCIO 03 · Aberta ou fechada?
  // ═════════════════════════════════════════════════════════
  function iniciarEx3() {
    const dia = $("#ex3-dia");
    const hora = $("#ex3-hora");
    preencherDias(dia, "quarta");

    function atualizar() {
      if (hora.value === "") {
        escrever($("#ex3-resultado"), "Escreva uma hora (0 a 23).", "aviso");
        return;
      }
      const aberta = estaAberta(dia.value, Number(hora.value));
      escrever($("#ex3-resultado"), `${dia.value}, ${hora.value}h → ${aberta ? "Aberta" : "Fechada"}`, aberta ? "ok" : "aviso");
    }
    dia.addEventListener("change", atualizar);
    hora.addEventListener("input", atualizar);
    atualizar();
  }

  // ═════════════════════════════════════════════════════════
  // EXERCÍCIO 04 · Funções da biblioteca
  // ═════════════════════════════════════════════════════════
  function iniciarEx4() {
    // mensagemMulta
    const dias = $("#ex4-dias");
    function atualizarMulta() {
      if (dias.value === "") {
        escrever($("#ex4-multa"), "Escreva os dias.", "aviso");
        return;
      }
      const n = Number(dias.value);
      escrever($("#ex4-multa"), `mensagemMulta(${n}) → ${mensagemMulta(n)}`, calcularMulta(n) === 0 ? "ok" : "aviso");
    }
    dias.addEventListener("input", atualizarMulta);
    atualizarMulta();

    // formatarEuros
    const valor = $("#ex4-valor");
    function atualizarEuros() {
      if (valor.value === "") {
        escrever($("#ex4-euros"), "Escreva um valor.", "aviso");
        return;
      }
      escrever($("#ex4-euros"), `formatarEuros(${valor.value}) → ${formatarEuros(Number(valor.value))}`, "ok");
    }
    valor.addEventListener("input", atualizarEuros);
    atualizarEuros();

    // estaAberta
    const dia = $("#ex4-dia");
    const hora = $("#ex4-hora");
    preencherDias(dia, "domingo");
    function atualizarAberta() {
      if (hora.value === "") {
        escrever($("#ex4-aberta"), "Escreva uma hora (0 a 23).", "aviso");
        return;
      }
      const resultado = estaAberta(dia.value, Number(hora.value));
      escrever($("#ex4-aberta"), `estaAberta("${dia.value}", ${hora.value}) → ${resultado}`, resultado ? "ok" : "aviso");
    }
    dia.addEventListener("change", atualizarAberta);
    hora.addEventListener("input", atualizarAberta);
    atualizarAberta();
  }

  // ═════════════════════════════════════════════════════════
  // EXERCÍCIO 05 · Lista de leituras
  // ═════════════════════════════════════════════════════════
  function iniciarEx5() {
    // 01 · cinco títulos
    const leituras = ["Os Maias", "Mensagem", "A Sibila", "Memorial do Convento", "Amor de Perdição"];

    function mostrar() {
      // 02 · quantos são
      escrever($("#ex5-total"), `Tenho ${leituras.length} livros na lista.`);

      // 03 · lista numerada a começar em 1
      const numerada = [];
      for (let i = 0; i < leituras.length; i++) {
        numerada.push(criarLi(`${i + 1}. ${leituras[i]}`));
      }
      $("#ex5-lista").replaceChildren(...numerada);

      // 04 · filter: só os títulos com mais de 10 letras (o array original não muda)
      const longos = leituras.filter(t => t.length > 10);
      $("#ex5-longos").replaceChildren(...longos.map(t => criarLi(t)));

      // 05 · map: títulos em maiúsculas (o array original não muda)
      const maiusculas = leituras.map(t => t.toUpperCase());
      $("#ex5-maiusculas").replaceChildren(...maiusculas.map(t => criarLi(t)));
    }

    // 02 · push
    $("#ex5-form").addEventListener("submit", evento => {
      evento.preventDefault();
      const campo = $("#ex5-titulo");
      const titulo = campo.value.trim();
      if (titulo === "") {
        escrever($("#ex5-aviso"), "Escreva um título.", "aviso");
        return;
      }
      if (leituras.includes(titulo)) {
        escrever($("#ex5-aviso"), `"${titulo}" já está na lista.`, "aviso");
        return;
      }
      leituras.push(titulo);
      escrever($("#ex5-aviso"), `"${titulo}" foi juntado.`, "ok");
      campo.value = "";
      mostrar();
    });
    mostrar();
  }

  // ═════════════════════════════════════════════════════════
  // EXERCÍCIO 06 · O catálogo em objetos
  // ═════════════════════════════════════════════════════════
  function iniciarEx6() {
    // 01 · seis livros
    const catalogo = [
      { titulo: "Os Maias", autor: "Eça de Queirós", ano: 1888, disponivel: true },
      { titulo: "Memorial do Convento", autor: "José Saramago", ano: 1982, disponivel: false },
      { titulo: "Mensagem", autor: "Fernando Pessoa", ano: 1934, disponivel: true },
      { titulo: "Livro do Desassossego", autor: "Fernando Pessoa", ano: 1982, disponivel: true },
      { titulo: "Amor de Perdição", autor: "Camilo Castelo Branco", ano: 1862, disponivel: false },
      { titulo: "A Cidade e as Serras", autor: "Eça de Queirós", ano: 1901, disponivel: true },
    ];

    function contarDisponiveis() {
      return catalogo.filter(l => l.disponivel).length;
    }

    // 05 · marca como emprestado, ou avisa se não puder
    function emprestar(titulo) {
      const livro = catalogo.find(l => l.titulo.toLowerCase() === titulo.toLowerCase());
      if (livro === undefined) {
        return { texto: `Aviso: "${titulo}" não existe no catálogo.`, tipo: "aviso" };
      }
      if (!livro.disponivel) {
        return { texto: `Aviso: "${livro.titulo}" já está emprestado.`, tipo: "aviso" };
      }
      livro.disponivel = false;
      return { texto: `"${livro.titulo}" foi emprestado.`, tipo: "ok" };
    }

    function mostrar() {
      // 02 · «Título — Autor (ano)» para cada livro
      const itens = catalogo.map(livro => {
        const li = criarLi(`${livro.titulo} — ${livro.autor} (${livro.ano})${livro.disponivel ? "" : " · emprestado"}`);
        if (!livro.disponivel) li.classList.add("indisponivel");
        return li;
      });
      $("#ex6-lista").replaceChildren(...itens);

      // 03 · quantos estão disponíveis
      escrever($("#ex6-contagem"), `Disponíveis: ${contarDisponiveis()} de ${catalogo.length}`);

      // 04 · o mais antigo
      let maisAntigo = catalogo[0];
      for (const livro of catalogo) {
        if (livro.ano < maisAntigo.ano) {
          maisAntigo = livro;
        }
      }
      escrever($("#ex6-antigo"), `Mais antigo: ${maisAntigo.titulo} — ${maisAntigo.autor} (${maisAntigo.ano})`);
    }

    $("#ex6-form").addEventListener("submit", evento => {
      evento.preventDefault();
      const campo = $("#ex6-titulo");
      const titulo = campo.value.trim();
      if (titulo === "") {
        escrever($("#ex6-aviso"), "Escreva o título do livro.", "aviso");
        return;
      }
      const resultado = emprestar(titulo);
      escrever($("#ex6-aviso"), resultado.texto, resultado.tipo);
      if (resultado.tipo === "ok") campo.value = "";
      mostrar();
    });
    mostrar();
  }

  iniciarEx1();
  iniciarEx2();
  iniciarEx3();
  iniciarEx4();
  iniciarEx5();
  iniciarEx6();
})();
