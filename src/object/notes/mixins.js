/*
 * Mixins are a design concept in programming that allows you to include
 * ("mix in") reusable pieces of code into classes. They are a way to share
 * behavior between multiple classes, objects or functions without having to
 * rely on inheritance.
 *
 * In JavaScript, mixins are typically implemented by creating an object
 * with a set of methods, which can then be added to other objects or
 * functions. This is done using the Object.assign() method, which copies
 * all enumerable own properties from one or more source objects to a target
 * object.
 *
 * This allows us to create new objects or functions that have access to the
 * methods defined in the mixin. This is a common pattern in JavaScript
 * programming.
 */

// Define a simple mixin
let sayMixin = {
  sayHi() {
    console.log(`Hello ${this.name}`)
  },
  sayBye() {
    console.log(`Bye ${this.name}`)
  },
}

// Usage:
let User = function (name) {
  this.name = name
}

// Copy the methods
Object.assign(User.prototype, sayMixin)

// Now User can say hi and bye
let user = new User('John')
user.sayHi() // Hello John
user.sayBye() // Bye John
