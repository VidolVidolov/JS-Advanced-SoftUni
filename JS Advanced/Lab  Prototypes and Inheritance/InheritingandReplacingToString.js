function toStringExtension() {
    class Person {
        constructor(name, email) {
            this.name = name;
            this.email = email;
        }
        className = 'Person';

        toString() {
            if (this.className !== 'Person') {
                if (this.className == 'Teacher') {
                    return `Teacher (name: ${this.name}, email: ${this.email}, subject: ${this.subject})`;
                } else {
                    return `Student (name: ${this.name}, email: ${this.email}, course: ${this.course})`;
                }
            }
            return `Person (name: ${this.name}, email: ${this.email})`;
        }
    }

    class Teacher extends Person {
        constructor(name, email, subject, toString) {
            super(name, email, toString);
            this.subject = subject;
        }
        className = 'Teacher';
    }

    class Student extends Person {
        constructor(name, email, course, toString) {
            super(name, email, toString);
            this.course = course;
        }

        className = 'Student';
    }

    return {
        Person,
        Teacher,
        Student,
    }
}

let classes = toStringExtension();
let Person = classes.Person;
let Teacher = classes.Teacher;
let Student = classes.Student;

let p = new Person("Pesho", 'Pesho@pesh.com');
console.log(p.toString());
