function solve(name, age, weight, height){

    let person = {
        name: name,
        age,
        weight,
        height: height * 0.01,
    };
    let bmi = Math.round(person.weight / Math.pow(person.height, 2));
    let status = '';
    if(bmi < 18.5){
        status = 'underweight';
    }else if(bmi < 25){
        status = 'normal';
    }else if(bmi < 30){
        status = 'overweight';
    }else{
        status = 'obese';
    }

    let toReturn = {
        name: person.name,
        personalInfo: {
            age: person.age,
            weight: person.weight,
            height: parseInt(person.height * 100),
        },
        BMI: bmi,
        status: status,
    };
    if(status == 'obese'){
        toReturn.recommendation = 'admission required';
    }
    return toReturn;
}

console.log(solve('Kotooshu', 33, 152, 203));