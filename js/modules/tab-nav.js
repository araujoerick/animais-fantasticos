export default function initTabNav() {
  const tabMenu = document.querySelectorAll("[data-tab='menu'] li");
  const tabContent = document.querySelectorAll("[data-tab='content'] section");

  function activeTab(index) {
    tabContent.forEach((section) => {
      section.classList.remove("ativo");
    });

    const direcaoAnimacao = tabContent[index].dataset.anime;
    tabContent[index].classList.add("ativo", direcaoAnimacao);
  }

  // Verifica se existe pra ai sim executa o código
  if (tabMenu.length && tabContent.length) {
    tabContent[0].classList.add("ativo");

    tabMenu.forEach((itemMenu, index) => {
      // console.log(itemMenu, index);
      itemMenu.addEventListener("click", () => {
        activeTab(index);
      });
    });
  }
}
