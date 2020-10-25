function growingWord() {
  let paragraphElement = document.querySelector('#exercise > p');
  let hasAtt = paragraphElement.getAttribute('style');

  if (hasAtt === null) {
    paragraphElement.setAttribute('style', `color: ${colors['blue']}; font-size: ${2}px`);
  } else {
    let styleSize = paragraphElement.style['font-size'].split('').filter(x => Number(x)).join('');
    let styleColor = paragraphElement.style.color;
    if (styleColor == 'blue') {
      paragraphElement.setAttribute('style', `color: ${colors['green']}; font-size: ${Number(styleSize) * 2}px`);
    } else if (styleColor == 'green') {
      paragraphElement.setAttribute('style', `color: ${colors['red']}; font-size: ${Number(styleSize) * 2}px`);
    } else if (styleColor == 'red') {
      paragraphElement.setAttribute('style', `color: ${colors['blue']}; font-size: ${Number(styleSize) * 2}px`);
    }
  }
}