import outsideClick from "./outsideclick.js";

export default function initMenuMobile() {
  const menuButton = document.querySelector("[data-menu='button']");
  const menuList = document.querySelector("[data-menu='list']");
  const eventos = ["click", "touchstart"];

  function openMenu() {
    menuButton.classList.add("active");
    menuList.classList.add("active");
    // Função importada, recebe o elemento que não deve ser clicado para ativar a função | Recebe o evento, nesse caso uma array | E a função de callback que nesse caso é anônima para remover as classes
    // Para funcionar é necessário adicionar o setTimeOut lá no outSideClick para que o callback só seja ativado após a fase de bubble (que ativa todos os eventos pais)
    outsideClick(menuList, eventos, () => {
      menuButton.classList.remove("active");
      menuList.classList.remove("active");
    });
  }

  if (menuButton) {
    // Como os eventos estão em uma array, é preciso de um forEach para selecionar um dos eventos que o usuário startar seja no click ou touch do celular
    eventos.forEach((evento) => menuButton.addEventListener(evento, openMenu));
  }
}
