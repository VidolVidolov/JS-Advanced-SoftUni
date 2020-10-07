class Company {

    constructor() {
        this.departments = [];
    }

    addEmployee(name, salary, position, department) {
        this.validateData(name);
        this.validateData(salary);
        this.validateData(position);
        this.validateData(department);
        this.departments.push({ name, salary, position, department });
        return `New employee is hired. Name: ${name}. Position: ${position}`
    }

    bestDepartment() {
        let deps = {};
        this.departments.forEach(x => {
            if (!deps[x.department]) {
                deps[x.department] = { salary: 0, employees: 0 };
            }
            deps[x.department].salary += x.salary;
            deps[x.department].employees++;
        });
        let avarageDepartmetsSalary = Object.entries(deps).map(([key, value]) => {
            let avg = value.salary / value.employees;
            let obj = {};
            obj[key] = avg
            return obj;
        });
        let sort = avarageDepartmetsSalary.sort((a, b) => {
            let A = Object.values(a);
            let B = Object.values(b);
            return B[0] - A[0];
        });
        let info = Object.entries(sort[0]);
        let [nameOfBestDep, avgSalary] = info.shift();
        let output = `Best Department is: ${nameOfBestDep}\nAverage salary: ${avgSalary.toFixed(2)}\n`;
        let employeesOfBestDep = {};
        this.departments.forEach(x => {
            if(x.department === nameOfBestDep){
                employeesOfBestDep[x.name] = [x.salary, x.position];
            }
        });
        let sortedEmployees = Object.keys(employeesOfBestDep).sort((a,b) => {
            let A = employeesOfBestDep[a][0];
            let B = employeesOfBestDep[b][0];
            return  B - A || a.localeCompare(b);
        });
        sortedEmployees.forEach(x => {
            output += `${x} ${employeesOfBestDep[x][0]} ${employeesOfBestDep[x][1]}\n`;
        });
        return output.trim();
    }

    validateData(value) {
        if (!value  || value < 0) {
            throw new Error('Invalid input!');
        }
    }
}

function solve() {
    let c = new Company();
    c.addEmployee("Stanimir", 2000, "engineer", "Construction");
    c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
    c.addEmployee("Slavi", 500, "dyer", "Construction");
    c.addEmployee("Stan", 2000, "architect", "Construction");
    c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
    c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
    c.addEmployee("Gosho", 1350, "HR", "Human resources");
    console.log(c.bestDepartment());
}
solve();

