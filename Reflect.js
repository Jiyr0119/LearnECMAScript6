// reflect get
import { firstName, lastName, year } from './Module.js';

var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    },
};

var myReceiverObject = {
    foo: 4,
    bar: 4,
    set baz(val) {
        return this.foo = val;
    }
};
// 如果key 相同。 取第三个参数的值。       target,    name,  receiver       
console.log("Reflect.get", Reflect.get(myObject, 'baz', myReceiverObject)) // 8

console.log("Reflect.get", Reflect.get(myObject, 'baz')) // 3

console.log("Reflect.set", Reflect.set(myReceiverObject, 'baz', 10)) // 3

// let ModuleTest = multiply(11, 5);
console.log(firstName)
// console.log('Module.js', ModuleTest)