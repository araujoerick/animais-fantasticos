export default function initModal() {
  const botaoAbrir = document.querySelector("[data-modal='abrir']");
  const botaoFechar = document.querySelector("[data-modal='fechar']");
  const containerModal = document.querySelector("[data-modal='container']");

  // function abrirModal(event) {
  //   event.preventDefault();
  //   containerModal.classList.add("ativo");
  // }

  // function fecharModal(event) {
  //   event.preventDefault();
  //   containerModal.classList.remove("ativo");
  // }

  // Inves de utilizar add e remove, é possível utilizar o toggle
  // Que verifica se tem a classe ou não. Se tem, coloca. Se não tem, tira.

  function toggleModal(event) {
    event.preventDefault();
    containerModal.classList.toggle("ativo");
  }

  // Estamos esperando o evento do containerModal que é a section do modal
  // que está tomando a tela toda
  // Então ao adicionar nesta section o addEventListener, o this vai ser sempre
  // a própria section (section class="modal-container")
  // Assim, colocamos a condição se o event.target (onde o mouse clica) é igual ao
  // this (section class="modal-container") então fecharModal(event)
  function cliqueForaModal(event) {
    // console.log("THIS");
    // console.log(this);
    // console.log("EVENT.TARGET");
    // console.log(event.target);
    // if (event.target === this) fecharModal(event);
    if (event.target === this) toggleModal(event);
  }

  // Para não dar erro em todo JS. Verifica se esses elemntos existem na page
  if (botaoAbrir && botaoFechar && containerModal) {
    botaoAbrir.addEventListener("click", toggleModal);
    botaoFechar.addEventListener("click", toggleModal);
    containerModal.addEventListener("click", cliqueForaModal);
  }
}
