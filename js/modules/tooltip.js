export default class initTooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips);

    // bind do objeto da classe aos callbacks do addEventListener
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  // Cria a tooltip box e coloca no body
  criarTooltipBox(element) {
    // Cria um elemento <div>
    const tooltipBox = document.createElement("div");
    // Adiciona a classe a div para estilizar com css
    tooltipBox.classList.add("tooltip");
    // Pega o texto do aria-label da div do mapa
    // element se refere ao this da função onMouseOver
    const text = element.getAttribute("aria-label");

    // Adiciona apenas o texto que vem do aria-label na div criada
    tooltipBox.innerText = text;

    // Coloca a div criada no final do body
    document.body.appendChild(tooltipBox);

    // Coloca tooltipBox como parâmetro do objeto da Class
    this.tooltipBox = tooltipBox;
  }

  // Criando função para pegar movimento do mouse como objeto
  // Nesse caso isso é passar um objeto como callback
  onMouseMove(event) {
    // Adiciona o style de top e left de acordo com a posição do mouse
    // No css esse valor é em pixel, então contena px no final do número

    // Como a caixa aparece embaixo do mouse, ela identifica que ocorreu o mouseMove
    // Então é só colocar a caixa uns 10px para o lado para não ficar embaixo
    this.tooltipBox.style.top = `${event.pageY + 10}px`;
    // Adiciona uma condição para que o tooltipbox mude de lado quando tiver muito no canto
    if (event.pageX + 210 > window.innerWidth) {
      this.tooltipBox.style.left = `${event.pageX - 175}px`;
    } else {
      this.tooltipBox.style.left = `${event.pageX + 10}px`;
    }
  }

  // Remove a tooltip e os eventos de mousemove e mouseleave
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove();
    // Remove o evento do onMouseLeave
    currentTarget.removeEventListener("mouseleave", this.onMouseLeave);

    // Remove o evento do onMouseMove
    currentTarget.removeEventListener("mousemove", this.onMouseMove);
  }

  // Em vez de sempre utilizar o event.currentTarget, podemos desestruturar o event
  // Mas só pode fazer isso se o event em si não precisar ser utilizado
  onMouseOver({ currentTarget }) {
    // Cria a tooltip box
    this.criarTooltipBox(currentTarget);

    // Adiciona o evento de movimento do mouse ao target
    currentTarget.addEventListener("mousemove", this.onMouseMove);
    // Adiciona o evento de saída do mouse ao target
    currentTarget.addEventListener("mouseleave", this.onMouseLeave);
  }

  // Adiciona o evento de mouseover para cada tooltip
  addTooltipsEvent() {
    this.tooltips.forEach((item) => {
      item.addEventListener("mouseover", this.onMouseOver);
    });
  }

  init() {
    if (this.tooltips.length) {
      this.addTooltipsEvent();
    }
    return this;
  }
}
