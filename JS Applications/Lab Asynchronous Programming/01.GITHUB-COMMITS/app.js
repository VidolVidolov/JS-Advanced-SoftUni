function loadCommits() {
    let inputUserName = document.getElementById('username');
    let inputRepo = document.getElementById('repo');
    const url = `https://api.github.com/repos/${inputUserName.value}/${inputRepo.value}/commits`;
    let ulElement = document.getElementById('commits');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            [...ulElement.children].forEach(x => x.remove()); // to refresh the ul list

            data.forEach(x => {
                let liEl = document.createElement('li');
                liEl.textContent = `${x.commit.author.name}: ${x.commit.message}`;
                ulElement.appendChild(liEl);
            });
        })
        .catch(err => {
            let liEl = document.createElement('li');
            liEl.textContent = `Error: ${err.status} (${err.text})`;
        });
}