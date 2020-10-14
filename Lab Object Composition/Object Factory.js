function solve(input){

    let info = JSON.parse(input);
    let newObj = info.reduce((acc, item) => ({...acc, ...item}),{});
    return newObj;
}

solve(`[{"canFly": true},{"canMove":true, "doors": 4},{"capacity": 255},{"canFly":true, "canLand": true}]`);