class Company {

    constructor() {
        this.departments = [];
    }

    addEmployee(username, salary, position, department) {
        this.validateData(username);
        this.validateData(salary);
        this.validateData(position);
        this.validateData(salary);
        let person = {
            username,
            salary,
            position,
            department,
        }
            this.departments.push(person);
            return `New employee is hired. Name: ${username}. Position: ${position}`;
        }
    
    bestDepartment() {
        let differentDeps = {};
        for (const person of this.departments) {
            if (!differentDeps[person.department]) {
                differentDeps[person.department] = {};
                differentDeps[person.department].salary = 0;
                differentDeps[person.department].employees = 0;
            }
            differentDeps[person.department].salary += person.salary;
            differentDeps[person.department].employees++;

        }
        let bestDepartment = this.calcAvgSalary(differentDeps);
        let bestDepartmentValues = Object.entries(bestDepartment);
        let [nameOfDep , avgSalary] = bestDepartmentValues[0];
        let output = `Best Department is: ${nameOfDep}\nAverage salary: ${avgSalary.toFixed(2)}\n`;
        let peopleFromBestDep = this.departments.filter(x => x.department === nameOfDep);
        let sort = peopleFromBestDep.sort((a, b) => {
            return b.salary - a.salary || a.username.localeCompare(b.username);
        });
        sort.forEach(x => {
            output += `${x.username} ${x.salary} ${x.position}\n`
        })
        return output.trim();
    }

    calcAvgSalary(object) {
        let newObj = {};
        Object.entries(object).forEach(([keys, values]) => {
            newObj[keys] = values.salary / values.employees
        });
        let bestD = Object.keys(newObj).sort((a, b) => newObj[b] - newObj[a]);
        let result = {};
        let BEST = bestD[0];
        let info = newObj[BEST];
        result[BEST] = info;
        return result;
    }
    validateData(value) {
        if (!value || value < 0) {
            throw new Error('Invalid input!');
        }
    }
}

function solve() {
    let c = new Company();
    c.addEmployee("Stamiir", 2000, "engineer", "Construction");
    c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
    c.addEmployee("Slavi", 500, "dyer", "Construction");
    c.addEmployee("Stan", 2000, "architect", "Construction");
    c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
    c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
    c.addEmployee("Gosho", 1350, "HR", "Human resources");
    console.log(c.bestDepartment());
}
solve();