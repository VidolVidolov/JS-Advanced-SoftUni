function solve() {
  let generateButton = document.querySelector('#exercise > button');
  generateButton.addEventListener('click', generateHanlder);
  let buyButton = document.querySelectorAll('#exercise > button')[1];
  buyButton.addEventListener('click', buyProducts);

  function generateHanlder() {
    let getInfo = document.getElementsByTagName('textarea')[0];
    let informationJson = JSON.parse(getInfo.value);
    let toAttach = document.getElementsByTagName('tbody')[0];
    informationJson.forEach(element => {
      let { name, img, price, decFactor } = element;
      let tr = document.createElement('tr');
      tr.innerHTML = `<td><img src=${img}></td><td><p>${name}</p></td><td><p>${price}</p></td><td><p>${decFactor}</p></td><td><input type="checkbox"/></td>`
      toAttach.appendChild(tr);
    });
    getInfo.value = '';
  }

  function buyProducts() {
    let setInfo = document.getElementsByTagName('textarea')[1];
    let getProducts = document.getElementsByTagName('tr');
    getProducts = Array.from(getProducts).slice(2);
    let container = [];
    Array.from(getProducts).forEach(x => {
      let checker = x.lastChild.children[0];
      if (checker.checked) {
        let information = Array.from(x.children).slice(1, 4);
        let [name, price, decFactor] = information;
        let obj = {};
        obj[name.innerText] = [price.innerText, decFactor.innerText];
        container.push(obj);
      }
    });
    let msgProductNames = 'Bought furniture: ';
    let msgProductsPrice = 0;
    let msgProductsFactor = 0;
    let counter = 0;
    let transit = [];
    container.forEach(x => {
      Object.keys(x).forEach(element => {
        transit.push(element);
        msgProductsPrice += Number(x[element][0]);
        msgProductsFactor += Number(x[element][1]);
        counter++;
      });
    });
    msgProductNames += transit.join(', ');
    msgProductsPrice = msgProductsPrice.toFixed(2);
    msgProductsFactor = msgProductsFactor/ counter;
    let finalMsg = `${msgProductNames}\nTotal price: ${msgProductsPrice}\nAverage decoration factor: ${msgProductsFactor}`;
    setInfo.value = finalMsg;
  }
}