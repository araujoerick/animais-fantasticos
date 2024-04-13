import debounce from "./debounce.js";

export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    // Pegar métade da tela do usuário para o site não ficar vazio no scroll
    this.windowHalf = window.innerHeight * 0.7;

    // O callback e o delay
    // Callback é a função que queremos ativar e o delay é o tempo que quer esperar
    this.checkDistance = debounce(this.checkDistance.bind(this), 50);
  }

  // Ao invés de ficar a todo momento pegando a distancia do elemento até o topo
  // Podemos fixar a distancia de cada elemento para otimizar o desempenho
  // Pegamos a distancia fixa com o offsetTop e colocamos em um objeto
  // Para pegar o elemento e a distancia do topo é necessário utilizar o map que vai
  // retornar esses valores da função para a propriedade nova this.distance
  // Porém o map só funciona com arrays, e a lista é um NodeList
  // Então desestruturamos e utilizamos o map para dividir a array possibilitanto o return
  // Poderia utilizar tambem o Array.from
  getDistance() {
    this.distance = [...this.sections].map((section) => {
      const offset = section.offsetTop;
      return {
        element: section,
        offset: Math.floor(offset - this.windowHalf),
      };
    });
    // Agora temos o retorno de 4 objetos com as propriedades elemento e a distância
  }

  // Agora criamos um método para checar a distância e verificar se o offset do elemento já passou do scroll. Verificamos o valor do scroll com o scrollY
  checkDistance() {
    this.distance.forEach((item) => {
      if (window.scrollY > item.offset) item.element.classList.add("ativo");
      else if (item.element.classList.contains("ativo")) {
        item.element.classList.remove("ativo");
      }
    });
  }

  init() {
    if (this.sections.length) {
      this.getDistance(); // Pega a distancia dos elementos ao iniciar o site
      this.checkDistance(); // Inicia a primeira animação para o site não ficar sem conteúdo
      window.addEventListener("scroll", this.checkDistance);
    }
    return this;
  }

  // Remove o event de scroll caso necessário
  stop() {
    window.removeEventListener("scroll", this.checkDistance);
  }
}
