// function loadRepos() {
// 	const httpRequest = new XMLHttpRequest();
// 	const userElement = document.getElementById('username');
// 	const reposElement = document.getElementById('repos');

// 	httpRequest.addEventListener('loadend', function() {
// 		const repos = JSON.parse(httpRequest.responseText);
// 		if(this.status == 404){
// 			reposElement.innerHTML = `<li><a>No such username!</a></li>`;
// 		}else {
// 			reposElement.innerHTML = repos.map(x => `<li><a href= "${x.html_url}">${x.name}</a></li>`).join('');
// 		}

// 	})

// 	const url = `https://api.github.com/users/${userElement.value}/repos`;

// 	httpRequest.open('GET', url);
// 	httpRequest.send();
// }

// function loadRepos() {
// 	let input = document.getElementById('username');
// 	let ulElement = document.getElementById('repos');
// 	let url = `https://api.github.com/users/${input.value}/repos`;

// 	let httpRequest = new XMLHttpRequest();

// 	httpRequest.addEventListener('loadend', function () {
// 		if (this.status == 404) {
// 			ulElement.innerHTML = '<li><a>No such username bruh!</a></li>';
// 		} else {
// 	ulElement.innerHTML = JSON.parse(this.responseText).map(x => `<li><a href= "${x.html_url}">${x.name}</a></li>`).join('');
// }
// 	});
// 	httpRequest.open('GET', url);
// 	httpRequest.send();
// }


function loadRepos() {
	let input = document.getElementById('username');
	let ulElement = document.getElementById('repos');
	let url = `https://api.github.com/users/${input.value}/repos`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
			ulElement.innerHTML = data.map(x => `<li><a href= "${x.html_url}">${x.name}</a></li>`).join('');
		})
		.catch(err => ulElement.innerHTML = '<li><a>No such username!</a></li>');

}
