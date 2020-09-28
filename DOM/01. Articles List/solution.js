function createArticle() {
	let sectionElements = document.getElementById('articles');

	let inputHeadingElement = document.getElementById('createTitle');
	let inputParagraphElement = document.getElementById('createContent');

	if (inputHeadingElement.value != '' && inputParagraphElement.value != '') {
		let newArticleElement = document.createElement('article');

		let headingElement = document.createElement('h3');
		headingElement.innerHTML = inputHeadingElement.value;

		let informationElement = document.createElement('p');
		informationElement.innerHTML = inputParagraphElement.value;

		newArticleElement.appendChild(headingElement);
		newArticleElement.appendChild(informationElement);
		sectionElements.appendChild(newArticleElement);
		inputHeadingElement.value = '';
		inputParagraphElement.value = '';
	}

}