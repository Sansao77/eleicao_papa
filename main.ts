type Cardinal = {
  id: number,
  nome: string | null,
  quantidade_votos: number
}

/*
Sistema de cadastro de cardeais:

1 - Cadastrar os 5 cardeais
2 - Demonstrar a lista dos cardeais, nome e numero de voto
3 - Podem ser quantas votações quiser
4 - Caso um papa não seja decidido (um cardinal com 2/3 dos votos) a votação é reiniciada na etapa 2 com zero votos
*/
const stringNullOrEmpty = (str: string | null | undefined):boolean =>{
  return str === null || str === undefined || str.trim().length === 0;
}


function listarCardeais(){
  const cardeais:Cardinal[] = [];

  console.log("Listar Cardeais:\n");
  for(let i = 1; i <= 5; i++){
    console.log("Nome do " + i + "º cardinal");
    const nome = prompt("R:");

    if(stringNullOrEmpty(nome)){
      console.log("O nome dado não é válido")
      i = i - 1
      continue;
    }

    cardeais.push({id: i, nome: nome, quantidade_votos: 0});
  }

  return cardeais;
}

function verificarVotacao(resultado: {votos: number[], total: number}){
  for(const voto of resultado.votos){
    if(voto/resultado.total >= 2/3) return resultado.votos.indexOf(voto) + 1;
  }

  return 0;
}

function processoVotacao(cardinais: Cardinal[]){
  let votos_totais = 0;
  while(true){
    console.log("Lista de Cardinais Concorrentes:\n");

    console.log("Total de votos: " + votos_totais);
    for(const cardenal of cardinais){
      console.log(cardenal.id + " - " + cardenal.nome + " (Votos: "+ cardenal.quantidade_votos +")");
    }

    console.log("Qual cardinal gostaria de votar? (somente digite o número, caso queira terminar a votação digite 6)");
    const resposta = prompt("R:");
    console.log(resposta);
    
    const id = (resposta !== null)? parseInt(resposta) : 0;

    if(id <= 0 || id > 6 || id === undefined){
      console.log("\nO número não é VALIDO! Retorne novamente\n");
    }
    else if(id === 6){
      return {votos: cardinais.map(x => x.quantidade_votos), total: votos_totais};
    }
    else{
      cardinais[id-1].quantidade_votos += 1;
      votos_totais += 1;
    }
  }
}

export function main(){
  const cardinais = listarCardeais();

  while(true){
    const resultados = processoVotacao(cardinais);
    const idResultante = verificarVotacao(resultados);

    if(idResultante !== 0){
      console.log("\nA votação foi um sucesso!");
      console.log("O novo papa é: ", cardinais[idResultante].nome);

      break;
    }

    cardinais.map(x => x.quantidade_votos = 0);

    console.log("\nSinto muito, a votação falhou pois nenhum cardinal conseguiu a quantidade necessaria de votos. Por favor refaça!\n\n");
  }
}

if(import.meta.main){
  main();
}
