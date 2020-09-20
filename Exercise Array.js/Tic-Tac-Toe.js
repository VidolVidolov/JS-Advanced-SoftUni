function solve(input) {

    let dashboard = [[false, false, false],
    [false, false, false],
    [false, false, false]];

    let playerX = 'X';
    let playerO = 'O';
    let checker = '';
    let turns = 1;
    for (let i = 0; i < input.length; i++) {
        let coordinates = input[i].split(' ').map(Number);
        if (turns == 1) {
            if (dashboard[coordinates[0]][coordinates[1]] === false) {
                dashboard[coordinates[0]][coordinates[1]] = playerX;
                turns = 0;
            } else {
                console.log('This place is already taken. Please choose another!');
            }
        } else if (turns == 0) {
            if (dashboard[coordinates[0]][coordinates[1]] === false) {
                dashboard[coordinates[0]][coordinates[1]] = playerO;
                turns = 1;
            } else {
                console.log('This place is already taken. Please choose another!');
            }
        }
        checker = checkIfPlayerWins(dashboard);
        if(checker === 'Wins'){
            break;
        }
        let clone = dashboard.slice();
        let end = '';
        let counter = 0;
        for (let index = 0; index < dashboard.length; index++) {
            let row = dashboard[index];
            if(!row.includes(false)){
                counter++;
            }
            if(counter == 3){
                end = 'end';
                break;
            }
        }
        if(end == 'end'){
            break;
        }
    }
    if(checker === 'Wins' && turns == 0){
        console.log(`Player ${playerX} wins!`);
    }else if(checker === 'Wins' && turns == 1){
        console.log(`Player ${playerO} wins!`);
    }else {
        console.log(`The game ended! Nobody wins :(`);
    }
    dashboard.forEach(element => console.log(element.join('\t')));

    function checkIfPlayerWins(dashboard) {
        if (dashboard[0][0] === dashboard[0][1] && dashboard[0][1] === dashboard[0][2] && dashboard[0][0] != false) {
            return 'Wins';
        } else if (dashboard[1][0] === dashboard[1][1] && dashboard[1][1] === dashboard[1][2] && dashboard[1][0] != false) {
            return 'Wins';
        } else if (dashboard[2][0] === dashboard[2][1] && dashboard[2][1] === dashboard[2][2] && dashboard[2][0] != false){
            return 'Wins';
        } else if(dashboard[0][0] === dashboard[1][0] && dashboard[1][0] === dashboard[2][0] && dashboard[0][0] != false){
            return 'Wins';
        } else if(dashboard[0][1] === dashboard[1][1] && dashboard[1][1] === dashboard[2][1] && dashboard[0][1] != false){
            return 'Wins';
        } else if(dashboard[0][2] === dashboard[1][2] && dashboard[1][2] === dashboard[2][2] && dashboard[0][2] != false){
            return 'Wins';
        } else if(dashboard[0][0] === dashboard[1][1] && dashboard[1][1] === dashboard[2][2] && dashboard[0][0] != false){
            return 'Wins';
        } else if(dashboard[0][2] === dashboard[1][1] && dashboard[1][1] === dashboard[2][0] && dashboard[0][2] != false){
            return 'Wins';
        }

    }
}

solve(["0 1",
"0 0",
"0 2",
"2 0",
"1 0",
"1 2",
"1 1",
"2 1",
"2 2",
"0 0"]


);