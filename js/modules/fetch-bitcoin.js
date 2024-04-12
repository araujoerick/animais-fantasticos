export default function fetchBitcoin(url, target) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const btcPreco = document.querySelector(target);

      btcPreco.innerText = (100 / json.BRL.sell).toFixed(5);
    })
    .catch((erro) => console.log(Error(erro)));
}
