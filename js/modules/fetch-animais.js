// Traz a animação dos números para esse arquivo
// Pra ela só acontecer depois que os números forem carregados do JSON
import AnimaNumeros from "./anima-numeros.js";

export default function fetchAnimais(url, target) {
  // Função para criar animais a partir do JSON que foi pego
  // Recebe cada objeto animal que veio do forEach
  // Cria uma div, adiciona uma classe e mostra no DOM
  function createAnimal(animal) {
    const div = document.createElement("div");
    div.classList.add("numero-animal");
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;

    return div;
  }

  // Pega a div que será setado os dados dos animais
  const numerosGrid = document.querySelector(target);

  function preencherAnimais(animal) {
    // Pega cada animal e seta como argumento da função createAnimal
    // Coloca o retorno da função (a div criada com createAnimal) na var divAnimal
    const divAnimal = createAnimal(animal);

    // Então seta cada div la no DOM com filho da div pai que neste caso é .numeros-grid
    numerosGrid.appendChild(divAnimal);
  }

  // Anima os números de cada animal
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros("[data-numero]", ".numeros", "ativo");
    animaNumeros.init();
  }

  // Puxa os animais do arquivo JSON
  async function criarAnimais() {
    try {
      // Espera pegar o conteúdo da URL
      const animaisResponse = await fetch(url);
      // Espera converter em JSON
      const animaisJSON = await animaisResponse.json();

      // Passa por cada objeto do JSON / cada animal
      // E passa como argumento para a função preencherAnimais
      animaisJSON.forEach((animal) => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }
  return criarAnimais();
}
