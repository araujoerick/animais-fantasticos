export default function initAnimaScroll() {
  const sections = document.querySelectorAll("[data-anime='scroll']");

  // Pegar métade da tela do usuário para o site não ficar vazio no scroll
  const windowHalf = window.innerHeight * 0.7;

  function animaScroll() {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const isSectionVisible = sectionTop - windowHalf < 0;

      if (isSectionVisible) section.classList.add("ativo");
      else if (section.classList.contains("ativo")) {
        section.classList.remove("ativo");
      }
    });
  }

  if (sections) {
    animaScroll();
    window.addEventListener("scroll", animaScroll);
  }
}
