function solveClasses() {

    class Developer {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.baseSalary = 1000;
            this.tasks = [];
            this.experience = 0;
        }

        addTask(id, taskName, priority) {
            let task = {};
            task = {
                id,
                taskName,
                priority,
            };

            if (priority == 'high') {
                this.tasks.unshift(task);
            } else if(priority == 'low'){
                this.tasks.push(task);
            }
            return `Task id ${id}, with ${priority} priority, has been added.`;
        }

        doTask() {

            if (this.tasks.length == 0) {
                return `${this.firstName}, you have finished all your tasks. You can rest now.`;
            }
            let task = this.tasks.shift();
            return task.taskName;

        }

        getSalary() {
            return `${this.firstName} ${this.lastName} has a salary of: ${this.baseSalary}`;
        }

        reviewTasks() {
            let output = '';
            if (this.tasks.length != 0) {
                output += 'Tasks, that need to be completed:\n';
                this.tasks.forEach(x => {
                    output += `${x.id}: ${x.taskName} - ${x.priority}\n`;
                });
            }

            return output.trim();
        }
    }

    class Junior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName);
            this.baseSalary += bonus;
            this.experience += experience;
        }

        learn(years) {
            this.experience += years;
        }
    }

    class Senior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName);
            this.baseSalary += bonus;
            this.experience = experience + 5;
        }

        changeTaskPriority(taskId) {
            let task = this.tasks.find(x => x.id == taskId);

            if (task.priority == 'high') {
                task.priority = 'low';
            } else if (task.priority == 'low') {
                task.priority = 'high';
            }

            if (task.priority == 'high') {
                let index = this.tasks.indexOf(this.tasks.find(x => x.id == taskId));
                let taskToBeMoved = this.tasks.splice(index, 1);
                this.tasks.unshift(taskToBeMoved);
            } else {
                let index = this.tasks.indexOf(this.tasks.find(x => x.id == taskId));
                let taskToBeMoved = this.tasks.splice(index, 1);
                this.tasks.push(taskToBeMoved);
            }
            return task;
        }
    }


    return {
        Developer,
        Junior,
        Senior
    }
}


let classes = solveClasses();
// Zero test 3 Senior

