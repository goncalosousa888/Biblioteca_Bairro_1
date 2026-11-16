const catalogo = [
  { titulo: "Os Maias", autor: "Eça de Queirós", ano: 1888, disponivel: true },
  { titulo: "Memorial do Convento", autor: "José Saramago", ano: 1982, disponivel: false },
  { titulo: "Mensagem", autor: "Fernando Pessoa", ano: 1934, disponivel: true },
  { titulo: "Livro do Desassossego", autor: "Fernando Pessoa", ano: 1982, disponivel: true },
  { titulo: "Amor de Perdição", autor: "Camilo Castelo Branco", ano: 1862, disponivel: false },
  { titulo: "A Cidade e as Serras", autor: "Eça de Queirós", ano: 1901, disponivel: true },
];

console.log("--- Catálogo ---");
for (const livro of catalogo) {
  console.log(`${livro.titulo} — ${livro.autor} (${livro.ano})`);
}


let totalDisponiveis = 0;
for (const livro of catalogo) {
  if (livro.disponivel) {
    totalDisponiveis++;
  }
}
console.log(`\nLivros disponíveis: ${totalDisponiveis} de ${catalogo.length}`);


let maisAntigo = catalogo[0];
for (const livro of catalogo) {
  if (livro.ano < maisAntigo.ano) {
    maisAntigo = livro;
  }
}
console.log(
  `Livro mais antigo: ${maisAntigo.titulo} — ${maisAntigo.autor} (${maisAntigo.ano})`
);

// 05 · emprestar(titulo)
function emprestar(titulo) {
  let livro = null;
  for (const l of catalogo) {
    if (l.titulo.toLowerCase() === titulo.toLowerCase()) {
      livro = l;
      break;
    }
  }

  if (livro === null) {
    console.log(`"${titulo}" não existe no catálogo.`);
  } else if (!livro.disponivel) {
    console.log(`"${livro.titulo}" já está emprestado.`);
  } else {
    livro.disponivel = false;
    console.log(`"${livro.titulo}" foi emprestado com sucesso.`);
  }
}

console.log("\n--- Empréstimos ---");
emprestar("Os Maias");              // sucesso
emprestar("Os Maias");              // já emprestado
emprestar("Memorial do Convento");  // já emprestado
emprestar("Ensaio sobre a Cegueira"); // não existe