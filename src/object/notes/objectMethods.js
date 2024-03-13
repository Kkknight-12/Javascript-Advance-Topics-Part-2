// Object.assign
// Object.assign

// Object.assign method is used to copy the values of all enumerable own
// properties from one or more source objects to a target object. It will
// return the target object.

const objA = {
  a: 'a',
}
const objB = {
  a: 'dd',
}

console.log(Object.assign({ z: 'z' }, objA, objB))
// { z: 'z', a: 'dd' }

// ----------------------------------------------

// Object.defineProperty

// Object.defineProperty method is used to define a new property directly on an
// object, or modify an existing property on an object, and return the object.

const a = {
  a: 'a',
}

const b = {}

// with Object.defineProperty,
Object.defineProperty(b, 'b', {
  value: 'b',
  enumerable: true,
})

console.log(Object.assign({}, a, b)) //{ a: 'a' }

// ----------------------------------------------
