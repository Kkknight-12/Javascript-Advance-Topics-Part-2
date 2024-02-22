/*
 *  a mixin is a technique that allows you to "mix in" additional properties
 *  or methods from one object into another object. This can be useful when
 *  you want to share functionality between different objects, but don't want
 *  to use inheritance.
 *  */

let sayMixin = {
  sayHi() {
    console.log(`Hello ${this.name}`)
  },
  sayBye() {
    console.log(`Bye ${this.name}`)
  },
}

let user = {
  name: 'John',
}

// copy the methods
Object.assign(user, sayMixin)

// now user can say hi
user.sayHi() // Hello John

// ----------------------Object.assign------------------------

/*
 * we have object: HasBread, represents a different aspect of a
 * sandwich. The Sandwich function is used to create a new
 * sandwich object. It uses Object.assign to copy the properties from the
 * HasBread object into the new sandwich object. The size and unit
 * parameters of the Sandwich function are used to set the size of the
 * sandwich.
 *
 * The Sandwich function is used to create a new sandwich object. It uses
 * Object.assign to copy the properties from the HasBread object into the
 * new sandwich object. The size and unit parameters of the Sandwich
 * function are used to set the size of the sandwich.
 *  */

const HasBread = {
  bread: 'Wheat',
}

const Sandwich = (size = '6', unit = 'in') =>
  Object.assign(
    {
      size,
      unit,
    },
    HasBread,
  )

const footLong = Sandwich(1, 'ft')
console.log(footLong.bread) // 'Wheat'

/*
 * You can take advantage of the spread operator:
 *
 * const Sandwich = (size = '6', unit = 'in') => ({
 * size, unit,
 * ...HasBread,
 * });
 *
 * */

// ---------------------------------mixin composition----------------------------------

/*
 * Functional mixins in JavaScript are a form of object composition, where
 * component features get mixed into a composite object so that properties
 * of each mixin become properties of the composite object. This is similar
 * to how you can mix different flavors into vanilla ice cream to create
 * custom flavors.
 *
 * In the provided code, the HasHash function is a functional mixin that adds
 * a calculateHash method to any object. This method calculates a hash based
 * on the values of certain keys in the object. The keys are passed to the
 * HasHash function as an array.
 *
 * The Transaction class is a class that represents a transaction. It has
 * properties like transactionId, timestamp, sender, recipient, and funds,
 * and methods like displayTransaction and netTotal.
 *
 * The Object.assign function is used to add the calculateHash method from
 * the HasHash mixin to the Transaction class. This means that all instances
 * of the Transaction class will have this method.  Here's a simplified
 * version of the code:
 *  */

const HasHash = (keys) => ({
  calculateHash() {
    const data = keys.map((f) => this[f]).join('')
    let hash = 0,
      i = 0
    while (i < data.length) {
      hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0
    }
    return hash ** 2
  },
})

class Transaction {
  constructor(sender, recipient, funds = 0.0) {
    this.sender = sender
    this.recipient = recipient
    this.funds = Number(funds)
  }
}

Object.assign(Transaction.prototype, HasHash(['sender', 'recipient', 'funds']))

const tx = new Transaction('luis@tjoj.com', 'luke@tjoj.com', 10)
console.log('tx.calculateHash() ', tx.calculateHash()) // Will output the hash

/*
 * The calculateHash method is available on tx because of the use of
 * Object.assign to add the HasHash mixin to the Transaction class's prototype.
 *
 * Object.assign(Transaction.prototype, HasHash(['sender', 'recipient',
 * 'funds'])) is where the HasHash mixin is added to the Transaction class.
 * Object.assign is a method that copies properties from one or more source
 * objects to a target object. In this case, the target object is
 * Transaction.prototype, which is the object that instances of Transaction
 * inherit properties and methods from. The source object is the object
 * returned by HasHash(['sender', 'recipient', 'funds']). So, the
 * calculateHash method is copied from this object to Transaction.prototype.
 *  */

// -------------------------------Anatomy of a mixin--------------------------------------

// ---------------------------------------------------------------------------------------

// https://medium.com/javascript-scene/functional-mixins-composing-software-ffb66d5e731c

/*
 * Functional mixins in JavaScript are a form of object composition, where component features get mixed into a composite object so that properties of each mixin become properties of the composite object. This is similar to how you can mix different flavors into vanilla ice cream to create custom flavors.  Functional mixins are composable factory functions that connect together in a pipeline, each function adding some properties or behaviors like workers on an assembly line. They don't depend on or require a base factory or constructor. You simply pass any arbitrary object into a mixin, and an enhanced version of that object will be returned.  Here's a simple example of a functional mixin:
 *  */

const flying = (o) => {
  let isFlying = false
  return Object.assign({}, o, {
    fly() {
      isFlying = true
      return this
    },
    isFlying: () => isFlying,
    land() {
      isFlying = false
      return this
    },
  })
}

const bird = flying({})
console.log(bird.isFlying()) // false
console.log(bird.fly().isFlying()) // true

/*
 * In this example, flying is a functional mixin that adds flying behavior to any object. It adds three methods: fly, isFlying, and land.  Functional mixins can be composed using function composition. For example:
 *  */

// const createDuck = (quack) => pipe(flying, quacking(quack))({})
//
// const duck = createDuck('Quack!')
// console.log(duck.fly().quack())

/*
 * In this example, createDuck is a function that creates a duck object with both flying behavior and quacking behavior. It uses the pipe function to compose the flying and quacking mixins.  Functional mixins are a powerful tool for object composition in JavaScript. However, like any tool, they should be used judiciously. Always use the simplest possible abstraction to solve the problem you're working on. Start with a pure function. If you need an object with persistent state, try a factory function. If you need to build more complex objects, try functional mixins.
 *  */