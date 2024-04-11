import outsideClick from "./outsideclick.js";

export default function initDropDownMenu() {
  const dropdowsMenus = document.querySelectorAll("[data-dropdown]");

  function handleClick(event) {
    event.preventDefault();
    // this se refere ao próprio menu que está sendo capturado através do evento click no loop do forEach
    this.classList.add("active");

    // this é o element, array é o events e callback é afunção a ser ativada no fim da execução
    outsideClick(this, ["click", "touchstart"], () => {
      this.classList.remove("active");
    });
  }

  dropdowsMenus.forEach((menu) => {
    // O evento de clique também funciona no mobile, porém ele aguarda 300ms
    // menu.addEventListener("click", handleClick); // Evento do mouse
    // menu.addEventListener("touchstart", handleClick); // Evento touch mobile

    // Podemos adicionar vários eventos utilizando uma array
    ["click", "touchstart"].forEach((userEvent) => {
      menu.addEventListener(userEvent, handleClick);
    });
  });

  // AULA 0506 - EVENT BUBBLE
  // O JS ao terminar de executar uma função com evento, verifica se tem outros eventos nos pais e se tiver, executa-os
}
