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

let p1 = new Point(3, 7);
let p2 = new Point(3, 8);

p1.__proto__.printName = function() {
    return 'Oops'
};

// console.log(p1.printName())

let p3 = new Point(3, 9)
// console.log(p3.printName())

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);
        this.color = color; // 正确
    }
}

let p4 = new ColorPoint(3, 10, 'red');
console.log('继承', p4);
console.log('继承', p4.printName());
console.log('是否继承某一个父类', Object.getPrototypeOf(ColorPoint) === Point)