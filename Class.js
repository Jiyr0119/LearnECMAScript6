class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return (`${this.x},${this.y}`)
    }
}
let point = new Point(3, 6);
console.log('class', point.toString());