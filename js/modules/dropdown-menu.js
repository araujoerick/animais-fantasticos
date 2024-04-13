import outsideClick from "./outsideclick.js";

export default class DropdownMenu {
  constructor(dropdownMenus, events) {
    this.dropdowsMenus = document.querySelectorAll(dropdownMenus);

    // O evento de clique também funciona no mobile, porém ele aguarda 300ms
    // "click" Evento do mouse | "touchstart" Evento touch mobile
    // Podemos adicionar vários eventos utilizando uma array
    if (events === undefined) this.events = ["touchstart", "click"];
    else this.events = events;

    this.activeClass = "active";

    // Bind no callback do evento
    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
  }

  // Ativa o dropdown menu e adiciona a função que observa o clique fora
  activeDropdownMenu(event) {
    event.preventDefault();
    // this se refere ao próprio menu que está sendo capturado através do evento click no loop do forEach
    // O this agora seria o objeto da classe, então temos que mudar de this para
    // event.currentTarget para poder capturar o elemento no DOM
    const element = event.currentTarget;
    element.classList.add(this.activeClass);

    // this é o element, array é o events e callback é afunção a ser ativada no fim da execução

    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  // Adiciona os eventos ao dropdown menu
  addDropdownMenusEvent() {
    this.dropdowsMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  }

  init() {
    if (this.dropdowsMenus.length) {
      this.addDropdownMenusEvent();
    }
    return this;
  }

  // EVENT BUBBLE
  // O JS ao terminar de executar uma função com evento, verifica se tem outros eventos nos pais e se tiver, executa-os
}
