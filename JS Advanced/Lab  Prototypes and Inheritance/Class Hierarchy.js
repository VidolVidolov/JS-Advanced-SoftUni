function figures() {

    class Figure {

        constructor(units = 'cm') {
            this.units = units;
        }

        changeUnits(units) {
            this.units = units;
        }

        convertor(inputInCm) {
            if(this.units === 'mm'){
               return inputInCm *= 10;
            }else if(this.units === 'm'){
               return inputInCm /= 100;
            }else {
               return inputInCm;
            }
        }

    }

    class Circle extends Figure {
        constructor(radius, units) {
            super(units);
            this.radius = radius;
        }
        get area() {
            const radius = this.convertor(this.radius)
            return Math.PI * radius * radius;
        }

        toString() {
            const radius = this.convertor(this.radius)
            return `Figures units: ${this.units} Area: ${this.area} - radius: ${radius}`
        }
    }

    class Rectangle extends Figure {
        constructor(width, height, units) {
            super(units);
            this.width = width;
            this.height = height;
        }

        get area() {
            const width = this.convertor(this.width);
            const height = this.convertor(this.height);

            return width * height;
        }

        toString() {
            const width = this.convertor(this.width);
            const height = this.convertor(this.height);
            return `Figures units: ${this.units} Area: ${this.area} - width: ${width}, height: ${height}`;
        }
    }

    return {
        Figure,
        Circle,
        Rectangle,
    }

}

figures();

