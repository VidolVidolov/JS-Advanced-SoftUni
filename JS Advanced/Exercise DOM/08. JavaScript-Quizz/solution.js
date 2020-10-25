function solve() {
  let sections = document.getElementsByTagName('section');
  let correctAnswers = 0;
  let outerCounter = 0;
  let rightAnswers = ['onclick', 'JSON.stringify()', 'A programming API for HTML and XML documents'];

  let neStavaInahce = (element) => {
    if (element.target.className === 'answer-text') {
      if (rightAnswers.includes(element.target.innerText)) {
        correctAnswers++;
      }
      sections[outerCounter].style.display = 'none';
      outerCounter++;

      if (sections[outerCounter] !== undefined) {
        sections[outerCounter].style.display = 'block';
      } else {
        let resultField = document.querySelector('.results-inner');
        document.getElementById('quizzie').removeEventListener('click', element);
        if (correctAnswers === rightAnswers.length) {
          resultField.innerHTML = `You are recognized as top JavaScript fan!`;
        } else {
          resultField.innerHTML = `You have ${correctAnswers} right answers`;
        }
        document.querySelector('#results').style.display = 'block';
      }
    }
  };
  document.getElementById('quizzie').addEventListener('click', neStavaInahce);
}


