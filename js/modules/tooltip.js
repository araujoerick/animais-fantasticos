export default function initTooltip() {
  // Seleciona as tootips
  const tooltips = document.querySelectorAll("[data-tooltip]");

  // Função para criar a caixa do tooltip
  function criarTooltipBox(element) {
    // Cria um elemento <div>
    const tooltipBox = document.createElement("div");

    // Adiciona a classe à div para estilizar com css
    tooltipBox.classList.add("tooltip");

    // Pega o texto do aria-label da div do mapa
    // element se refere ao this da função onMouseOver
    const text = element.getAttribute("aria-label");

    // Adiciona apenas o texto que vem do aria-label na div criada
    tooltipBox.innerText = text;

    // Coloca a div criada no final do body
    document.body.appendChild(tooltipBox);

    return tooltipBox;
  }

  // Criando função para pegar movemneto do mouse como objeto
  // Nesse caso isso é passar um objeto como callback
  const onMouseMove = {
    handleEvent(event) {
      // Adiciona o style de top e left de acordo com a posição do mouse
      // No css esse valor é em pixel, então contena px no final do número

      // Como a caixa aparece embaixo do mouse, ela identifica que ocorreu o mouseMove
      // Então é só colocar a caixa uns 10px para o lado para não ficar embaixo
      this.tooltipBox.style.top = `${event.pageY + 10}px`;
      this.tooltipBox.style.left = `${event.pageX + 10}px`;
    },
  };

  // Remove div e evento
  // Para acessar as variaveis da função onMouseOver é preciso utilizar o
  // objeto com handleEvent em seu interior
  const onMouseLeave = {
    handleEvent() {
      this.tooltipBox.remove();
      // Remove o evento do onMouseLeave
      this.element.removeEventListener("mouseleave", onMouseLeave);

      // Remove o evento do onMouseMove
      this.element.removeEventListener("mousemove", onMouseMove);
    },
  };

  // Funçao a ser executada atendendo o evento do tooltips
  function onMouseOver() {
    // Passando o this como argumento. O this no caso do addEventListener
    // é o próprio elemento que foi selecionado com o querySelector
    const tooltipBox = criarTooltipBox(this);

    // Adiciona tooltipBox como propriedade no objeto onMouseMove
    onMouseMove.tooltipBox = tooltipBox;

    // Evento de movimento do mouse
    this.addEventListener("mousemove", onMouseMove);

    // Adiciona tooltipBox como propriedade no objeto onMouseLeave
    onMouseLeave.tooltipBox = tooltipBox;

    // Adiciona o próprio elemento como propriedade do objeto onMouseLeave
    onMouseLeave.element = this;

    // Um novo evento para remover o tooltip quando o mouse sair
    this.addEventListener("mouseleave", onMouseLeave);
  }

  // Adiciona um evento para cada tooltip
  tooltips.forEach((item) => {
    item.addEventListener("mouseover", onMouseOver);
  });
}
