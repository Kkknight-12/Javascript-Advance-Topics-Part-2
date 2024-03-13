// ///////////////
// Parent Object /
// ///////////////
function Animal() {
  this.specie = 'Animal'
}

// ////////////////////
// prototype property /
// ////////////////////
Animal.prototype.walk = function () {
  console.log(`${this.name} walks`)
}

// //////////////
// Child Object /
// //////////////
function Cat(name) {
  this.lives = 9
  this.name = name

  this.sayName = function () {
    console.log(`Meow! My name is ${this.name}`)
  }
}

// //////////////////////
// creating inheritance /
// //////////////////////

// wrong way to inherit
/* 
we previosly used this method to transfer inheritance
but its a wrong way 
Cat.prototype = Animal.prototype
*/

// two better way to create inheritance

// new operator
Cat.prototype = new Animal()

// Object.create()

// but with this method you will inherit just the
// prototype properties and method,
// we will not be access Animal own properties/method link specie
/* 
Object.create() takes in a single object as an argument,
and returns a new object with its __proto__ property set 
to what argument is passed into it.  
*/
// Cat.prototype = Object.create( Animal.prototype );

Cat.prototype.meow = function () {
  console.log(`My name is ${this.name} I do Meow`)
}

// //////////////////////////////////////
// Set constructor back to object itself /
// //////////////////////////////////////
/* 
always remember to set the constructor function back to itself
*/

// shortcut method
// but the constructor will be iterable, which is not good
// Cat.prototype.constructor = Cat;
// console.log(bill.constructor)

// proper way to create constructor
Object.defineProperty(Cat.prototype, 'constructor', {
  enumerable: false, // setting the iterable property to false
  value: Cat,
  writable: true,
})

console.log('Cat.prototype => ', Cat.prototype)
// Animal {specie: "Animal",
// meow: ƒ,
// constructor: ƒ}
// Animal {meow: ƒ, constructor: ƒ}, if you create Cat with Object.create

// as we have set the value of object constructor to non-iterable
// it will not be shown in for loop
// using short-cut method will make constructor iterable
for (let prop in Cat.prototype) {
  // console.log(prop)
  // object constructor should not be iterable
  /* 
  meow
  walk
  */
}

// ----------------------------------------------------------------

// /////////////////
// object instance /
// /////////////////
const bill = new Cat('Bailey')
bill.nickName = function () {
  console.log('kill bill panday')
}

console.log(bill.constructor) // true

console.log(bill instanceof Animal) // true
console.log(bill instanceof Cat) // true

console.log(Object.getPrototypeOf(bill))

const checkPrototype = Object.getPrototypeOf(bill)
console.log(checkPrototype.isPrototypeOf(bill)) // true

console.log(bill.hasOwnProperty('nickName')) // true

bill.walk() // Animal prototype method
console.log(bill.specie) // Animal property
bill.sayName() // Cat prototype method
bill.meow() // Cat prototype method
bill.nickName() // bill method
console.log(bill.lives) // Cat property
