function solve() {

  let divForElement = document.getElementsByClassName('link-1');
  let array = Array.from(divForElement);
  for (const x of array) {
    x.addEventListener('click', () => {
      let paragraph = x.querySelector('p');
      let number = Number(paragraph.innerHTML.split(' ')[1]);
      number++;
      paragraph.innerHTML = `visited ${number} times`
    });
  }
}