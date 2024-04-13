export default class Funcionamento {
  constructor(funcionamento, activeClass) {
    this.funcionamento = document.querySelector(funcionamento);
    this.activeClass = activeClass;
  }

  dadosFuncionamento() {
    // Tudo é objeto, assim selecionamos a semana com ponto a partir do objeto funcionamento
    // Então transformamos em uma array com o split na vírgola
    // Utilizamos a iteração do map em cada item da array para transformá-los em number utilizando o construtor Number
    this.diasSemana = this.funcionamento.dataset.semana.split(",").map(Number);
    this.horarioSemana = this.funcionamento.dataset.horario
      .split(",")
      .map(Number);
  }

  dadosAgora() {
    this.dataAgora = new Date();
    this.diaAgora = this.dataAgora.getDay();
    this.horarioAgora = this.dataAgora.getUTCHours() - 3;
  }

  estaAberto() {
    // Verifica se está aberto comparando o diaAgora com o diasSemana
    // Quando falso, o index of retorna -1
    const semanaAberto = this.diasSemana.indexOf(this.diaAgora) !== -1;

    // Verifica agora o horário aberto com uma expressão
    // Como só tem dois valores na array, 0 é 8 e 1 é 18
    const horarioAberto =
      this.horarioAgora >= this.horarioSemana[0] &&
      this.horarioAgora < this.horarioSemana[1];
    return semanaAberto && horarioAberto; // Isso retorna true
  }

  ativaAberto() {
    if (this.estaAberto()) {
      this.funcionamento.classList.add(this.activeClass);
    }
  }

  init() {
    if (this.funcionamento) {
      this.dadosFuncionamento();
      this.dadosAgora();
      this.estaAberto();
    }
    return this;
  }
}
