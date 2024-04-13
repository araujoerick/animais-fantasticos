export default class AnimaNumeros {
  constructor(numeros, observerTarget, observerClass) {
    this.numeros = document.querySelectorAll(numeros);
    // Elemento a ser observado
    this.observerTarget = document.querySelector(observerTarget);
    this.observerClass = observerClass;

    // bind o this do objeto ao callback de handleMutation
    this.handleMutation = this.handleMutation.bind(this);
  }

  // Quando tem um método em uma classe que não precisa do objeto da class para funcionar
  // Devemos definir como uma função estática. Então essa função agora faz parte da class
  // AnimaNumeros e não do objeto que é criado a partir da AnimaNumeros
  // Porém não é possível utlizar ela direto com o this agora, então é necessário puxar ela
  // do construtor dela
  // Método que pega o número dentro de uma tag de elemento no DOM
  static incrementarNumero(numero) {
    const total = +numero.innerText;
    // Math.floor para arredondar o número
    // Divide por cem o valor total e adiciona la no incremento
    // Para que a contagem não seja de um em um
    const incremento = Math.floor(total / 100);
    let start = 0;

    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start;
      // Se start for maior que total, limpa o intervalo
      if (start > total) {
        // Como o número passa e seta um valor a mais e errado, definimos o valor final no DOM como o próprio valor que foi retirado do DOM.
        numero.innerText = total;
        // E paramos o setInterval
        clearInterval(timer);
      }
    }, 20 * Math.random()); // Random para o intervalo ficar diferente e mais dinâmico
  }

  animaNumeros() {
    this.numeros.forEach(
      (numero) => this.constructor.incrementarNumero(numero) // Puxa do construtor
    );
  }

  // O mutation é um parâmetro tipo o event. Ele retorna uma array like com a mutação capturada
  // Então pegamos o target do primeiro item da array e verifica se contém a class "ativo"
  // Se sim, para o observer e ativa a função de animar os números
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  addMutatinObserver() {
    // O observer é criado e adicionado como método da classe
    // O this.handleMutation não está referenciando a classe e sim ao observer, então é
    // necessário fazer o bind
    this.observer = new MutationObserver(this.handleMutation);
    // O observador observa mudanças de atributo do elemento definido, e então executa a função de callback setada. Nesse caso quando aparecer a classe "ativo" no DOM
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  init() {
    if (this.numeros.length || this.observerTarget) {
      this.addMutatinObserver();
    }
    return this;
  }
}
