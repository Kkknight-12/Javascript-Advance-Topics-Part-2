/**
 * The Object.create(proto [,propertiesObject]) API in JavaScript is used to
 * create a new object, using the first argument as the prototype of the new
 * object. The optional second argument is an object defining additional
 * properties to be added to the new object.
 *
 * The proto argument is the object which should be the prototype of the
 * newly-created object.
 *
 * The propertiesObject is an optional parameter. If provided, it should be
 * an object where each key corresponds to a property to be added to the new
 * object, and the corresponding value is an object that describes that
 * property.
 * */

const proto = {
  sender: 'sender@gmail.com',
}

/**
 * Using Object.create to configure a new child object based on a parent
 * object (proto). Internally, the child object has a reference to the
 * parent to access any of its properties. Another way to do this is to call
 * the Object.setPrototypeOf(child, proto) API.
 * */
const child = Object.create(proto)
console.log('child object ', child) //  {}

child.recipient = 'recipient@gmail.com'
console.log('recipient ', child.recipient) //  recipient@gmail.com
console.log('child object ', child) //   { recipient: 'recipient@gmail.com' }

// sending exist in the prototype
console.log('sender ', child.sender) //  sender@gmail.com

console.log('-----------------------------------')
// ------------------------------------------------------------------------

/**
 * Let’s begin constructing example
 *
 * uses Object.create to establish a prototype configuration between two
 * objects, moneyTransaction and transaction, and adds support for funds.
 * */

/**
 * Prototype object from which to derive other objects—a regular object, not
 * some abstract blueprint
 * */
const transaction = {
  sender: 'sender@gg.com',
  recipient: 'recipient@gg.com',
}

/**
 * Creates a derived object from the prototype
 * */
const moneyTransaction = Object.create(transaction)
moneyTransaction.funds = 0.0

/**
 * Adds new methods to the child object. Repeating the function name in the
 * declaration helps build more-informative stack traces.
 * */
moneyTransaction.addFunds = function addFunds(funds = 0) {
  this.funds += Number(funds)
}

moneyTransaction.addFunds(10.0)
console.log('moneyTransaction ', moneyTransaction.funds) // 10.0

/**
 * Checks whether the prototype link has been established
 * */
// Object.getPrototypeOf returns the prototype of the specified object.
console.log(
  'getPrototypeOf moneyTransaction ',
  Object.getPrototypeOf(moneyTransaction),
)
//  { sender: 'sender@gg.com', recipient: 'recipient@gg.com' }

// Verifies that the prototype link has been established
console.log(Object.getPrototypeOf(moneyTransaction) === transaction) // true

/**
 * Verifies that inherited properties are accessible from the child object
 * */
console.log(moneyTransaction.sender) // sender@gg.com
console.log(moneyTransaction.funds) // 10

console.log('-----------------------------------')
// ------------------------------------------------------------------------

/**
 * Here’s another take on this code, using Object.create’s second parameter,
 * which receives an object of data descriptors:
 * */
const moneyTransactionS = Object.create(transaction, {
  funds: {
    value: 0.0,
    enumerable: true,
    writable: true,
    configurable: false,
  },
})
console.log('funds ', moneyTransactionS.funds)

for (const moneyTransactionSKey in moneyTransactionS) {
  console.log(moneyTransactionSKey) // funds, sender, recipient
}
/*
 * This second argument gives us fine control over how this newly created
 * object’s properties behave:
 *
 * Enumerable—Controls whether the property can be enumerated or viewed (as
 * when you pass the object to **console.log**, enumerating the keys with
 *  **Object.keys** ), or whether it’s seen byObject.assign (a topic that we’ll
 *  circle
 *  back to in chapter 3).
 *
 * Configurable—Controls whether you’re allowed to **delete** an object’s
 * property with the delete keyword or whether you can reconfigure the
 * field’s property descriptor.
 *
 * Writable—Controls whether you can **reassign the value** of this field,
 * effectively making its assignment immutable.
 */

console.log('-----------------------------------')
// ------------------------------------------------------------------------
/*
 * When you create a property by using the dot notation directly on the
 * object, that act is equivalent to defining a property
 * with a descriptor with all settings set to true. Typically, most
 * developers don’t bother with data descriptors, but they can come in handy
 * when you’re writing your own libraries and frameworks for others to use
 * and want to do things such as hide a certain field from view or make some
 * fields immutable. Data descriptors help enforce certain design principles
 * and communicate clear intentions about how your APIs work.
 *
 * As you can see, Object.create offers a simple, elegant way to create
 * objects from a shared prototype and establishes the proper inheritance
 * linkage to resolve property lookups.
 * */

// ------------------------------------------------------------------------

// Property resolution process

/*
 * According to the ECMAScript specification, an internal reference known as
 * [[Prototype]] (accessible via the __proto__ property in objects) is
 * configured by Object.create and effectively links moneyTransaction to
 * transaction. This is the sole reason why we can
 * properly resolve moneyTransaction.sender to the value 'luis@tjoj.com',
 *
 * When requesting a member field, the JavaScript engine first looks for the
 * property in the calling object. If JavaScript can’t find the property
 * there, it looks in [[Prototype]]. The property sender is not declared in
 * money- Transaction, yet it still resolves successfully. Why? Any property
 * access or method invocation in moneyTransaction will travel up the
 * prototype chain, continuing to transaction until it finds the property
 * there and returns it. But what if it doesn’t? The lookup process would
 * continue further, finally terminating at the empty object literal {}
 * (aka Object.prototype). If resolution fails, the result of the operation
 * is undefined for a value property or a TypeError for a function-valued
 * property.
 *
 * Behind the scenes, you can think of the hidden __proto__ property as
 * being the bridge that allows you to traverse the chain. When we use
 * prototypes to implement inheritance, which is the most common scenario,
 * we say that property resolution “moves up” the inheritance chain
 *
 * You should ** never use __proto__ ** directly in your applications, as it’s
 * meant to be used internally by the JavaScript engine. Hypothetically, if
 * surfaced in userland code, it would look something like this:
 *
 * const moneyTransaction = {
     __proto__: transaction,
     funds: 0.0,
     addFunds: function addFunds(funds = 0) {
       this.funds += Number(funds);
       return this;
  }
}
*
* If you need to manipulate this field, the recommended APIs are
* - Object.getPrototypeOf and
* - Object.setPrototypeOf.
* You can also call the Object.isPrototypeOf method directly on the object.
* */
console.log(
  'transaction is isPrototypeOf moneyTransaction ',
  transaction.isPrototypeOf(moneyTransaction),
) // true

console.log('Object.getPrototypeOf ', Object.getPrototypeOf(moneyTransaction))
//  { sender: 'sender@gg.com', recipient: 'recipient@gg.com' }

const obj = {}
const parent = { foo: 'bar' }

console.log(obj.foo)
// Expected output: undefined

// Set the prototype of the object to parent
Object.setPrototypeOf(obj, parent)

console.log('Object.getPrototypeOf ', Object.getPrototypeOf(obj)) //  { foo: 'bar' }

// when there is no prototype set it returns null
console.log('Object.getPrototypeOf ', Object.getPrototypeOf(parent))
//   [Object: null prototype] {}

console.log('-----------------------------------')
// ------------------------------------------------------------------------

// Differential inheritance
/*
 * Differential inheritance, in which derived objects maintain references to
 * the objects from which they are derived, is common in prototypal
 * languages. In JavaScript, differential inheritance is called
 * [[Prototype]]. By contrast, in class-based inheritance, a derived object
 * copies all the state and behavior from its own class, as well as all its
 * derived classes. The key distinction is copy versus link.
 *
 * Although this term sounds a bit intimidating, differential inheritance is
 * a simple concept referring to how extended behavior separates a derived
 * object from its linked generic parent. If you think about a JavaScript
 * object as being a dynamic bag of properties, differentiation means
 * adding properties to another bag and linking the two bags. The prototype
 * resolution mechanism flows uni directionally from a calling object to its
 * linked object (and so on), any newly derived object is meant to
 * differentiate itself from its parent with new behavior. New behavior
 * includes adding new properties or even **overriding** an existing property
 * from a linked object (known as **shadowing** ). You can visit
 *  http://mng.bz/OEmR for more information.
 *
 * Consider another scenario in which we extend the generic transaction
 * object to define hashTransaction. This object differentiates itself from
 * its parent by adding a function (calculateHash) to compute its own hash
 * value. At a high level, hashing is using an object’s state to generate a
 * unique string value, much as JSON.stringify does, but we need to target
 * only the values, not the entire shape of the object. This hash value has
 * many uses in industry, such as fast insert/retrieval from hash tables or
 * dictionaries, as well as data integrity checks.
 *
 *  */

const transaction2 = {
  sender: 'luis@tjoj.com',
  recipient: 'luke@tjoj.com',
}

const hashTransaction = Object.create(transaction2)
console.log(
  'hashTransaction with Object.create sender ',
  hashTransaction.sender,
)

hashTransaction.calculateHash = function calculateHash() {
  const data = [this.sender, this.recipient].join('')
  let hash = 0,
    i = 0
  while (i < data.length) {
    hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0
  }
  return hash ** 2
}

hashTransaction.calculateHash() // 237572532174000400

/**
 * To take another approach, you can also use **Object.setPrototypeOf** to
 * differentiate a child object. Suppose that you want to extend
 * moneyTransaction from hash- Transaction. All the same mechanisms apply:
 * */
const moneyTransaction2 = Object.setPrototypeOf({}, hashTransaction)
console.log(
  'moneyTransaction2 setPrototypeOf sender ',
  moneyTransaction2.sender,
)
moneyTransaction2.funds = 0.0
moneyTransaction2.addFunds = function addFunds(funds = 0) {
  this.funds += Number(funds)
}

moneyTransaction2.addFunds(10)
moneyTransaction2.calculateHash() // 237572532174000400
console.log('moneyTransaction.funds ', moneyTransaction.funds) //10
console.log('moneyTransaction.sender ', moneyTransaction.sender) //'luis@tjoj.com'
console.log('moneyTransaction.recipient ', moneyTransaction.recipient) // 'luke@tjoj.com'

console.log(
  'hashTransaction getPrototypeOf ',
  Object.getPrototypeOf(hashTransaction),
)
//  { sender: 'luis@tjoj.com', recipient: 'luke@tjoj.com' }

console.log(
  'moneyTransaction2 getPrototypeOf ',
  Object.getPrototypeOf(moneyTransaction2),
)
// { calculateHash: [Function: calculateHash] }