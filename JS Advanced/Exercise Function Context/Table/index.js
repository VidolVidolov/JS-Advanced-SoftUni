function solve() {
   let tbodyElement = document.getElementsByTagName('tbody')[0];
   let lastClicked;
   Array.from(tbodyElement.children).forEach(row => {
      row.addEventListener('click', handler);
   });

   function handler(e) {
      let elementToChange = e.target.parentElement;
      if (elementToChange.style.backgroundColor === '') {
         elementToChange.style.backgroundColor = "#413f5e";
         if (lastClicked === undefined) {
            lastClicked = elementToChange;
         }else {
            if(lastClicked !== elementToChange){ // because im comparing by reference not value , if anyone wonders why its working :)
               lastClicked.style.backgroundColor = '';
               lastClicked = elementToChange;
            }
         }
      } else {
         elementToChange.style.backgroundColor = '';
      }

   }
}
