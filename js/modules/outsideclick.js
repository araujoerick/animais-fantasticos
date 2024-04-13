// Passo como parametro o this que é o elemento capturado no evento de clique do handleClick e também o callback que é
export default function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const outside = "data-outside";

  function handleOutsideClick(event) {
    // Se o elemento não for igual ao event target, então executa o callback para remover a classe ativo
    if (!element.contains(event.target)) {
      element.removeAttribute(outside, ""); // remove o atributo
      // Remover o evento tambem pq não vai ser utilizado até o próximo clique
      events.forEach((userEvent) =>
        html.removeEventListener(userEvent, handleOutsideClick)
      );

      callback();
    }
  }

  // Setar atributo para verificar se o evento ocorreu, para que não ocorra novamente
  // Se element não tem o atributo data-outside, então faça:
  if (!element.hasAttribute(outside)) {
    events.forEach((userEvent) =>
      setTimeout(() => html.addEventListener(userEvent, handleOutsideClick))
    );
    element.setAttribute(outside, ""); // Seta o atributo
  }
}
