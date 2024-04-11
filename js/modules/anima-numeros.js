export default function initAnimaNumeros() {
  function animaNumeros() {
    const numeros = document.querySelectorAll("[data-numero]");

    numeros.forEach((numero) => {
      const total = +numero.innerText;
      // Math.floor para arredondar o número
      // Divide por cem o valor total e adicona la no incremento
      // Para que a contagem não seja de um em um
      const incremento = Math.floor(total / 100);
      let start = 0;

      const timer = setInterval(() => {
        start += incremento;
        numero.innerText = start;
        // Se start for maior que total, limpa o intervalo
        if (start > total) {
          // Como o número passa e seta um valor errado, é interessante definir como o valor total no final
          numero.innerText = total;

          clearInterval(timer);
        }
      }, 20 * Math.random());
    });
  }

  // O mutation é um parâmetro tipo o event. Ele retorna uma array like com a mutação capturada
  function handleMutation(mutation) {
    if (mutation[0].target.classList.contains("ativo")) {
      observer.disconnect();
      animaNumeros();
    }
  }
  // Elemento a ser observado
  const observerTarget = document.querySelector(".numeros");

  // O observador observa mudanças de atributo do elemento definido, e então execulta a função de callback setada
  const observer = new MutationObserver(handleMutation);

  observer.observe(observerTarget, { attributes: true });
}
