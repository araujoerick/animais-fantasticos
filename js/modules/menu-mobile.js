import outsideClick from "./outsideclick.js";

export default class MenuMobile {
  constructor(menuButton, menuList, events) {
    this.menuButton = document.querySelector(menuButton);
    this.menuList = document.querySelector(menuList);
    // O evento de clique também funciona no mobile, porém ele aguarda 300ms
    // "click" Evento do mouse | "touchstart" Evento touch mobile
    // Podemos adicionar vários eventos utilizando uma array
    if (events === undefined) this.events = ["touchstart", "click"];
    else this.events = events;
    this.activeClass = "active";

    this.openMenu = this.openMenu.bind(this);
  }

  openMenu() {
    this.menuButton.classList.add(this.activeClass);
    this.menuList.classList.add(this.activeClass);
    // Função importada, recebe o elemento que não deve ser clicado para ativar a função | Recebe o evento, nesse caso uma array | E a função de callback que nesse caso é anônima para remover as classes
    // Para funcionar é necessário adicionar o setTimeOut lá no outSideClick para que o callback só seja ativado após a fase de bubble (que ativa todos os eventos pais)
    outsideClick(this.menuList, this.events, () => {
      this.menuButton.classList.remove(this.activeClass);
      this.menuList.classList.remove(this.activeClass);
    });
  }

  addMenuMobileEvents() {
    // Como os eventos estão em uma array, é preciso de um forEach para selecionar um dos eventos que o usuário startar seja no click ou touch do celular
    this.events.forEach((evento) =>
      this.menuButton.addEventListener(evento, this.openMenu)
    );
  }

  init() {
    if (this.menuButton && this.menuList) {
      this.addMenuMobileEvents();
    }
    return this;
  }
}
