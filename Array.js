// array from
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
console.log("from:", arr2)

// array of 
let arrOf = Array.of(3, { 'test': 'isme' }, 8, 'arrayof'); // [3,11,8]
console.log("arrof:", arrOf)

// arr sort
var sort = [10, 20, 1, 2]
sort.sort((x, y) => {
    if (x < y) {
        return 1;
    }
    if (x > y) {
        return -1;
    }
    return 0;
});
console.log("sort", sort); // [1, 2, 10, 20]