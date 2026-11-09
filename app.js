// Gonçalo

console.log("Bem-vindos à Biblioteca do Bairro, onde cada leitura conta!");
console.log(2026 - 1987);


const nome = "Biblioteca do Bairro";
const morada = "Rua das Flores, 12";

let livros = 1250;
livros -= 3;
console.log(livros);

console.log(`A ${nome} tem ${livros} livros disponíveis.`);
console.log(typeof nome, typeof morada, typeof livros);
console.log(nome.toUpperCase());

function estaAberta(dia, hora) {
    if (dia === "domingo") return false;
    if (dia === "sábado") return hora >= 10 && hora < 13;
    return hora >= 9 && hora < 19;
}

console.log(estaAberta("terça", 14));
console.log(estaAberta("sexta", 20));
console.log(estaAberta("sábado", 11));
console.log(estaAberta("domingo", 12));


function calcularMulta(dias) {
    return dias > 15 ? (dias - 15) * 0.5 : 0;
}

function formatarEuros(valor) {
    return valor.toFixed(2).replace(".", ",") + " €";
}

function mensagemMulta(dias) {
    const multa = calcularMulta(dias);
    return multa === 0 ? "Sem multa" : `Multa a pagar: ${formatarEuros(multa)}`;
}

console.log(calcularMulta(15), calcularMulta(16), calcularMulta(24));
console.log(formatarEuros(1.5), formatarEuros(8.75), formatarEuros(24));
console.log(mensagemMulta(15));
console.log(mensagemMulta(16));
console.log(mensagemMulta(24));


const lista = ["Felizmente Há Luar!", "Amor de Perdição", "A Cidade e as Serras", "Os Lusíadas", "Memorial do Convento"];
lista.push("Ensaio sobre a Cegueira", "A Sibila");
console.log(lista.length);

lista.forEach((titulo, i) => console.log(`${i + 1}. ${titulo}`));

const longos = lista.filter(titulo => titulo.length > 10);
const maiusculas = lista.map(titulo => titulo.toUpperCase());
console.log(longos);
console.log(maiusculas);
