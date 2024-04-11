export default function initScrollSuave() {
  const linksInternos = document.querySelectorAll(
    "[data-menu='suave'] [href^='#']"
  );

  function scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href);

    // Método mais suportado e não precisa calcular a distância do topo
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // MÉTODOS ALTERNATIVOS
    // const sectionTop = section.offsetTop; // A distância do topo até o topo do elemento
    // Método para scrollar que recebe dois valores em pixels
    // window.scrollTo(0, sectionTop);

    // Método scrollTo(options) recebe um objeto e permite o scroll suave
    // window.scrollTo({
    //   top: sectionTop,
    //   behavior: "smooth",
    // });
  }

  linksInternos.forEach((link) => {
    link.addEventListener("click", scrollToSection);
  });
}
