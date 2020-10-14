function solve(input) {

    let result = [];
    input.forEach(element => {
        let [width, height] = element;
        result.push({
            width,
            height,
            area: function () {
                return width * height;
            },
            compareTo: function (rect) {
                return rect.area() - this.area() ||  rect.width - this.width;
            }
        });
    });
    let sorted = result.sort((a,b) => a.compareTo(b));
    return sorted;
}


console.log(solve([[1,20],[20,1],[5,3],[5,3]]));
console.log(solve([[10,5], [3,20], [5,12]]));
