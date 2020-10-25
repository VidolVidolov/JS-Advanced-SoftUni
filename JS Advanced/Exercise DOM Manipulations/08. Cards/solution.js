function solve() {
   let playerOneHand = document.getElementById('player1Div');
   let playerTwoHand = document.getElementById('player2Div');
   let currentResult = document.getElementById('result');

   playerOneHand.addEventListener('click', firstMove);
   playerTwoHand.addEventListener('click', secondMove);
   let firstHiddenCard = '';
   let secondHiddenCard = '';
   let roundFinished = 0;

   function firstMove(e) {
      let curentCard = e.target;
      firstHiddenCard = curentCard.name;
      curentCard.removeAttribute('src');
      curentCard.setAttribute('src', 'images/whiteCard.jpg');
      currentResult.firstElementChild.innerText = curentCard.name;
      roundFinished++;
      if (roundFinished == 2) {
         let winner = checkWhoWinsCurrentRound(firstHiddenCard, secondHiddenCard);
         roundFinished = 0;
         let enemyCard = document.getElementById('player2Div').querySelector(`img[name="${secondHiddenCard}"]`);
         if (winner === 'Player1') {
            curentCard.style.border = "2px solid green";
            enemyCard.style.border = '2px solid red';
         } else {
            curentCard.style.border = '2px solid red';
            enemyCard.style.border = '2px solid green';
         }
      }
   }

   function secondMove(e) {
      let curentCard = e.target;
      secondHiddenCard = curentCard.name;
      curentCard.removeAttribute('src');
      curentCard.setAttribute('src', 'images/whiteCard.jpg');
      currentResult.lastElementChild.innerText = curentCard.name;
      roundFinished++;
      if (roundFinished == 2) {
         let winner = checkWhoWinsCurrentRound(firstHiddenCard, secondHiddenCard);
         roundFinished = 0;
         let enemyCard = document.getElementById('player1Div').querySelector(`img[name="${firstHiddenCard}"]`);
         if (winner === 'Player1') {
            curentCard.style.border = "2px solid red";
            enemyCard.style.border = '2px solid green';
         } else {
            curentCard.style.border = '2px solid green';
            enemyCard.style.border = '2px solid red';
         }
      }
   }

   function checkWhoWinsCurrentRound(hand1, hand2) {
      let divHistory = document.getElementById('history');
      let txt = `[${hand1} vs ${hand2}] `;
      currentResult.firstElementChild.innerText = '';
      currentResult.lastElementChild.innerText = '';
      divHistory.innerText += txt; 
      if (Number(hand1) > Number(hand2)) {
         return 'Player1';
      } else {
         return 'Player2';
      }
   }
}