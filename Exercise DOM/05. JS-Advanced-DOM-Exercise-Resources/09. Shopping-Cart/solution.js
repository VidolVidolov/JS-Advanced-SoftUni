function solve() {
   let responseArea = document.getElementsByClassName('shopping-cart');
   let shoppingCart = new Set();
   let prices = {
      Bread: 0.80,
      Milk: 1.09,
      Tomatoes: 0.99,
   };
   let checkBill = 0;

   let pickProducts = (element) => {
      let checker = element.target.parentElement.previousSibling.previousElementSibling.children[0];
      let checkOut = element.target.className;
      if (checker !== undefined) {
         if (checker.innerHTML === 'Bread') {
            let currBill = prices[checker.innerHTML];
            checkBill += prices[checker.innerHTML];
            shoppingCart.add(checker.innerHTML);
            let msg = `Added ${checker.innerHTML} for ${currBill.toFixed(2)} to the cart.\n`
            let txtArea = document.getElementsByTagName('textarea')[0];
            txtArea.innerHTML += msg;
         } else if (checker.innerHTML === 'Milk') {
            let currBill = prices[checker.innerHTML];
            checkBill += prices[checker.innerHTML];
            shoppingCart.add(checker.innerHTML);
            let msg = `Added ${checker.innerHTML} for ${currBill.toFixed(2)} to the cart.\n`
            let txtArea = document.getElementsByTagName('textarea')[0];
            txtArea.innerHTML += msg;
         } else if (checker.innerHTML === 'Tomatoes') {
            let currBill = prices[checker.innerHTML];
            checkBill += prices[checker.innerHTML];
            shoppingCart.add(checker.innerHTML);
            let msg = `Added ${checker.innerHTML} for ${currBill.toFixed(2)} to the cart.\n`
            let txtArea = document.getElementsByTagName('textarea')[0];
            txtArea.innerHTML += msg;
         }
      } else if (checkOut === 'checkout') {
         let products = Array.from(shoppingCart.values()).join(', ');
         let txtArea = document.getElementsByTagName('textarea')[0];
         txtArea.innerHTML += `You bought ${products} for ${checkBill.toFixed(2)}.`;
         document.querySelector('.shopping-cart').removeEventListener('click', pickProducts);
      }
   }
   document.querySelector('.shopping-cart').addEventListener('click', pickProducts);
}