function attachEvents() {
    const initialUrl = 'https://blog-apps-c12bf.firebaseio.com/';

    let btnLoadPosts = document.getElementById('btnLoadPosts');
    let btnViewPosts = document.getElementById('btnViewPost');
    let ulElement = document.getElementById('post-comments');
    let selectElment = document.getElementById('posts');
    let h1Element = document.getElementById('post-title');
    let titleBody = document.getElementById('post-body');

    btnLoadPosts.addEventListener('click', loadHandler);
    btnViewPosts.addEventListener('click', viewPosts);

    function viewPosts() {
        let currPost = [...selectElment].find(x => x.selected);
        let key = currPost.value;
        let url = initialUrl + `posts/${key}` + '.json';
        let commentsUrl = initialUrl + `posts/${key}/` + 'comments' + '.json';

        [...ulElement.children].forEach(x => x.remove());

        fetch(url)
            .then(response => response.json())
            .then(data => {
                h1Element.textContent = data.title;
                titleBody.textContent = data.body;
            })
            .catch(err => {
                console.log(err);
            });

        fetch(commentsUrl)
            .then(response => response.json())
            .then(data => {
                [...data].forEach(x => {
                    let liEl = document.createElement('li');
                    liEl.textContent = x.text;
                    ulElement.appendChild(liEl);
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    function loadHandler() {
        let url = initialUrl + 'posts.json';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let keys = Object.keys(data);
                let htmlScript = '';
                [...keys].forEach(x => {
                    htmlScript += `<option value= "${x}">${data[x].title}</option>`;
                });
                selectElment.innerHTML = htmlScript;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

attachEvents();