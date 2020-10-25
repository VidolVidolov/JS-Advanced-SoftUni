function solve() {
  let informationElement = document.querySelector('#input');
  let parent = document.querySelector('#output');
  let setences = informationElement.innerHTML;
  setences = setences.split('.').filter(x => x !== '');
  let counter = 0;
  let paragrahContent = [];
  setences.forEach((element,index) => {
    let sentance = element + '.';
    paragrahContent.push(sentance);
    counter++;
    if (counter === 3) {
      let paragraphElement = document.createElement('p');
      paragraphElement.innerHTML = paragrahContent.join('');
      parent.appendChild(paragraphElement);
      counter = 0;
      paragrahContent = [];
    }
    if(setences[index + 1] == undefined){
      let paragraphElement = document.createElement('p');
      paragraphElement.innerHTML = paragrahContent.join('');
      parent.appendChild(paragraphElement);
    }
  });

}