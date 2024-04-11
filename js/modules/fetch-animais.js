// Traz a animação dos números para esse arquivo
// Pra ela só acontecer depois que os números forem carregados do JSON
import initAnimaNumeros from "./anima-numeros.js";

export default function initFetchAnimais() {
  // Função para criar animais a partir do JSON que foi pego
  // Recebe cada objeto animal que veio do forEach
  function createAnimal(animal) {
    const div = document.createElement("div");
    div.classList.add("numero-animal");
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;

    return div;
  }

  async function fetchAnimais(url) {
    try {
      // Espera pegar o conteúdo da URL
      const animaisResponse = await fetch(url);
      // Espera converter em JSON
      const animaisJSON = await animaisResponse.json();
      // Pega a div que será setado os dados dos animais
      const numerosGrid = document.querySelector(".numeros-grid");

      // Passa por cada objeto do JSON / cada animal
      animaisJSON.forEach((animal) => {
        // Pega cada animal e seta como argumento da função createAnimal
        // Coloca o retorno da função dentro da var divAnimal
        const divAnimal = createAnimal(animal);

        // Seta cada div la no DOM com filho da div pai
        numerosGrid.appendChild(divAnimal);
      });
      initAnimaNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }

  fetchAnimais("./animaisapi.json");
}
