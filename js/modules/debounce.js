// Debounce é um helper, podia estar em uma pasta separada

export default function debounce(callback, delay) {
  let timer;

  return (...args) => {
    // Desestrutura o args para passar qualquer argumento
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
      timer = null; // Quando a função for ativada vai dar clearTimeout
    }, delay);
  };
}
