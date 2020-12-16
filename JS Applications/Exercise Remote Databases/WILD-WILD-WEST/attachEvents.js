function attachEvents() {

  let url = 'https://wild-wild-west-8e2d7.firebaseio.com/Players.json';
  let buttonAddPlayer = document.getElementById('addPlayer');
  let divPlayers = document.getElementById('players');
  let divWithButtons = document.getElementById('buttons');
  let canvasElement = document.getElementById('canvas');
  
  buttonAddPlayer.addEventListener('click', addPlayer);

  (function onload(url) {

    fetch(url)
      .then(res => res.json())
      .then(data => {
        let keys = Object.keys(data);

        keys.forEach(x => {
          let curr = document.createElement('div');
          curr.setAttribute('class', 'player');
          curr.setAttribute('id', x);
          curr.innerHTML = `<div class="row">
        <label>Name:</label>
        <label class="name">${data[x].name}</label>
    </div>
    <div class="row">
        <label>Money:</label>
        <label class="money">${data[x].money}</label>
    </div>
    <div class="row">
        <label>Bullets:</label>
        <label class="bullets">${data[x].bullets}</label>
    </div>`;

          let playButton = document.createElement('button');
          playButton.setAttribute('class', 'play');
          playButton.addEventListener('click', playGame);
          playButton.textContent = 'Play';
          let deleteButton = document.createElement('button');
          deleteButton.setAttribute('class', 'delete');
          deleteButton.addEventListener('click', deleteGame);
          deleteButton.textContent = 'Delete';
          curr.appendChild(playButton);
          curr.appendChild(deleteButton);
          divPlayers.appendChild(curr);
        })

      })
      .catch(err => window.alert(err.message));
  })(url);

  let getPlayer = async function (url) {
    let response = await fetch(url);
    let toReturn = await response.json();
    let newInfo = await loadCanvas(toReturn);
    canvasElement.style.display = 'block';
    return newInfo;
  };

  async function playGame() {
    let id = this.parentElement.getAttribute('id');
    let url = `https://wild-wild-west-8e2d7.firebaseio.com/Players/${id}.json`;
    let [saveBtn, reloadBtn] = divWithButtons.children;
    saveBtn.style.display = 'inline-block';
    reloadBtn.style.display = 'inline-block';

    await saveBtn.addEventListener('click', (e) => saveInformation(e, player, id));
    await reloadBtn.addEventListener('click', (e) => reload(e, player, id));
    
    let player = await getPlayer(url); 
  }

  function reload(e, player, id) {
    let url = `https://wild-wild-west-8e2d7.firebaseio.com/Players/${id}.json`;
    player.money -= 60;
    player.bullets = 6;
    let getcurrDiv = document.getElementById(`${id}`);
    let money = getcurrDiv.getElementsByClassName('money')[0];
    let bullets = getcurrDiv.getElementsByClassName('bullets')[0];

    money.textContent = player.money;
    bullets.textContent = player.bullets;
    fetch(url, { method: 'PATCH', body: JSON.stringify(player) });

  }

  async function saveInformation(e, player, id) {
    let url = `https://wild-wild-west-8e2d7.firebaseio.com/Players/${id}.json`;

    let promise = await fetch(url, { method: 'PATCH', body: JSON.stringify(player) });
    let getcurrDiv = document.getElementById(`${id}`);
    let name = getcurrDiv.getElementsByClassName('name')[0];
    let money = getcurrDiv.getElementsByClassName('money')[0];
    let bullets = getcurrDiv.getElementsByClassName('bullets')[0];
    
    name.textContent = player.name;
    money.textContent = player.money;
    bullets.textContent = player.bullets;
    
    canvasElement.style.display = 'none';
    let [saveBtn, reloadBtn] = divWithButtons.children;
    saveBtn.style.display = 'none';
    reloadBtn.style.display = 'none';
    location.reload();
  }

  function deleteGame() {
    let id = this.parentElement.getAttribute('id');

    let url = `https://wild-wild-west-8e2d7.firebaseio.com/Players/${id}.json`;

    fetch(url, { method: 'DELETE' })
      .then(res => this.parentElement.remove())
      .then(data => console.log(data))
  }

  function addPlayer() {
    let playerName = document.getElementById('addName');

    if (playerName.value !== '') {
      let currentPlayer = {
        name: playerName.value,
        money: 500,
        bullets: 6,
      };

      fetch(url, { method: 'POST', body: JSON.stringify(currentPlayer) })
        .then(res => res.json())
        .then(data => {
          let curr = document.createElement('div');
          curr.setAttribute('class', 'player');
          curr.setAttribute('id', data.name);
          curr.innerHTML = `<div class="row">
        <label>Name:</label>
        <label class="name">${currentPlayer.name}</label>
    </div>
    <div class="row">
        <label>Money:</label>
        <label class="money">${currentPlayer.money}</label>
    </div>
    <div class="row">
        <label>Bullets:</label>
        <label class="bullets">${currentPlayer.bullets}</label>
    </div>`;

          let playButton = document.createElement('button');
          playButton.setAttribute('class', 'play');
          playButton.addEventListener('click', playGame);
          playButton.textContent = 'Play';
          let deleteButton = document.createElement('button');
          deleteButton.setAttribute('class', 'delete');
          deleteButton.addEventListener('click', deleteGame);
          deleteButton.textContent = 'Delete';
          curr.appendChild(playButton);
          curr.appendChild(deleteButton);
          divPlayers.appendChild(curr);
          playerName.value = '';
        })
        .catch(err => window.alert(err.message));
    }
  }
}