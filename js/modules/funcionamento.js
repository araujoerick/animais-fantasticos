export default function initFuncionamento() {
  const funcionamento = document.querySelector("[data-semana]");
  // Tudo é objeto, assim selecionamos a semana com ponto a partir do objeto funcionamento
  // Então transformamos em uma array com o split na vírgola
  // Utilizamos a iteração do map em cada item da array para transformá-los em number utilizando o construtor
  const diasSemana = funcionamento.dataset.semana.split(",").map(Number);
  const horarioSemana = funcionamento.dataset.horario.split(",").map(Number);

  const dataAgora = new Date();
  const diaAgora = dataAgora.getDay();
  const horarioAgora = dataAgora.getHours();

  // Verifica se está aberto comparando o diaAgora com o diasSemana
  // Quando falso, o index of retorna -1
  const semanaAberto = diasSemana.indexOf(diaAgora) !== -1;

  // Verifica agora o horário aberto com uma expressão
  // Como só tem dois valores na array, 0 é 8 e 1 é 18
  const horarioAberto =
    horarioAgora >= horarioSemana[0] && horarioAgora < horarioSemana[1];

  if (semanaAberto && horarioAberto) {
    funcionamento.classList.add("aberto");
  }
}
