var people = {
    name: "张三",
    age: 18
};

var proxy = new Proxy(people, {
    get: function(target, property) {
        // console.log('target：', target)
        // console.log('property：', property)
        if (property in target) {
            return target[property];
        } else {
            throw new ReferenceError("Property \"" + property + "\" does not exist.");
        }
    }
});
// console.log(proxy.name) // "张三"
// console.log(proxy.age) // 抛出一个错误

function createArray(...elements) {
    let handler = {
        get(target, propKey, receiver) {
            // console.log('target：', target)
            // console.log('propKey', propKey)
            // console.log('receiver', receiver)
            let index = Number(propKey);
            if (index < 0) {
                propKey = String(target.length + index);
            }
            return Reflect.get(target, propKey, receiver);
        }
    };

    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
// console.log("array", arr[-1]) // c

// 链式调用 get
var pipe = (function() {
    return function(value) {
        var funcStack = [];
        var oproxy = new Proxy({}, {
            get: function(pipeObject, fnName) {
                // console.log("pipeObject",pipeObject)
                // console.log("fnName",fnName)
                if (fnName === 'get') {
                    return funcStack.reduce(function(val, fn) {
                        // console.log("val",val)
                        // console.log("fn",fn)
                        return fn(val);
                    }, value);
                }
                funcStack.push(window[fnName]);
                return oproxy;
            }
        });

        return oproxy;
    }
}());

var double = n => n * 2;
var pow = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;
//pipe(3).double 参数 3 * 2 = 6.   .pow 6 * 6 = 36     .reverseInt 
console.log('链式调用：pipe', pipe(3).double.pow.reverseInt.get)

// get  creat dom
const dom = new Proxy({}, {
    get(target, property) {
        // console.log("target:", target);
        // console.log("property:", property);
        return function(attrs = {}, ...children) {
            // console.log("attrs:", attrs);
            // console.log("children:", children);
            const el = document.createElement(property);
            for (let prop of Object.keys(attrs)) {
                el.setAttribute(prop, attrs[prop]);
            }
            for (let child of children) {
                if (typeof child === 'string') {
                    child = document.createTextNode(child);
                }
                el.appendChild(child);
            }
            return el;
        }
    }
});

const el = dom.div({},
    'Hello, my name is ',
    dom.a({ href: '//example.com' }, 'Jonathan'),
    '. I like:',
    dom.ul({},
        dom.li({}, 'The web'),
        dom.li({}, 'Food'),
        dom.li({}, '…actually that\'s it')
    )
);

document.body.appendChild(el);

//proxy  set 

let validator = {
    set: function(obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid');
            }
        }

        // 对于满足条件的 age 属性以及其他属性，直接保存
        obj[prop] = value;
    }
};

let person = new Proxy({}, validator);

person.age = 100;
// person.age = 'young' // 报错
// person.age = 300 // 报错


const objTest = {};
Object.defineProperty(objTest, 'foo', {
    value: 'bar',
    writable: false,
});

const handler = {
    set: function(obj, prop, value, receiver) {
        objTest[prop] = 'baz';
    }
};

const proxyTest = new Proxy(objTest, handler);
proxyTest.foo = 'baz';
console.log("proxyTest.foo", proxyTest.foo)
// "bar"

// proxy apply
var twice = {
        // target = 目标对象  ctx = 目标对象的上下文对象 args = 目标对象数组
    apply(target, ctx, args) {
        console.log("apply", arguments)
        return Reflect.apply(...arguments) * 2;
    }
};

let sum = (...data) => {
    console.log("sum", data)
    let res = 0;
    for (let item of data) {
        if (!item) {
            item = 0;
        }
        res += item;
    }
    return res;
};
var twiceproxy = new Proxy(sum, twice);
console.log("twiceproxy", twiceproxy(1, 2))
console.log("twiceproxy.call", twiceproxy.call(5, 5, 6, 9, 10, 2))
console.log("twiceproxy.apply", twiceproxy.apply(null, [7, 8]))