// Constructor functions
/*
 * Constructor functions in JavaScript are a way to create multiple objects
 * with the same structure. They act as a blueprint for creating objects.
 * */

function Transaction(sender, recipient) {
  this.sender = sender
  this.recipient = recipient
}

// You can create a new Transaction object like this:
const tx11 = new Transaction('aaaa@tjoj.com', 'bbbb@tjoj.com')

// Functions as templates
/*
 * HashTransaction is a specialized version of Transaction with an
 * additional method calculateHash. It's created like this:
 * */

function HashTransaction(sender, recipient) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target
  /*
   * The new.target property lets you detect whether the constructor was
   * called with new. If not, it creates a new instance correctly.
   *  */
  if (!new.target) {
    return new HashTransaction(sender, recipient)
  }

  /*
   * The Transaction.call(this, sender, recipient); line calls the
   * Transaction constructor in the context of the new HashTransaction
   * object, setting up the sender and recipient properties.
   *  */
  Transaction.call(this, sender, recipient)

  /*
   * The calculateHash method is added directly to each HashTransaction object.
   * This means each object gets its own copy of the method, which is not
   * memory efficient if you're creating many objects.
   *  */
  this.calculateHash = function calculateHash() {
    const data = [this.sender, this.recipient].join('')
    let hash = 0,
      i = 0
    while (i < data.length) {
      hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0
    }
    return hash ** 2
  }
}

const tx = new HashTransaction('luis@tjoj.com', 'luke@tjoj.com')
console.log(tx.calculateHash()) // 237572532174000400
console.log(tx.sender) // 'luis@tjoj.com'

/*
 * By using functions, you can easily instantiate as many HashTransaction
 * objects as you like, all of them containing the properties defined in
 * Transaction as well. One caveat is that you need to call the function with
 * the new keyword to ensure the context (this) is initialized properly.
 *
 * These objects do not share references to any properties, however. You
 * defined calculateHash directly on HashTransaction’s context (this
 * variable), for example, adding a new calculateHash property to each
 * instance of HashTransaction. In other words, if you create two instances,
 * you’ll see two copies of the same method:
 *  */
const tx1 = new HashTransaction('luis@tjoj.com', 'luke@tjoj.com')
const tx2 = new HashTransaction('luis@tjoj.com', 'luke@tjoj.com')
console.log(tx1.calculateHash === tx2.calculateHash) // false

// ------------------------------------------------------------------------

// Sharing properties by using constructors and prototypes

/*
 * To fix this problem, you need to configure how prototypes links are set up
 * as new objects are created.
 */

// Sharing properties by using constructors and prototypes

/*
 * One interesting aspect of using constructors is that for every constructor
 * F, JavaScript automatically creates the object F.prototype:
 * HashTransaction.prototype; // HashTransaction {}
 * */

/*
 * To solve this, you can add the calculateHash method to the
 * HashTransaction prototype, so all HashTransaction objects share the
 * same method:
 * */
HashTransaction.prototype.calculateHash2 = function calculateHash() {
  // ...
}

/*
 * Now, all HashTransaction objects share the same calculateHash method,
 * which is more memory efficient. The prototype property is an object shared
 * among all instances of a constructor function. When you try to access a
 * property or method on an object, JavaScript will first look on the object
 * itself, and if it doesn't find it there, it will look on the object's
 * prototype. This is how JavaScript implements inheritance.
 * */

/*
 * With this slight twist, these two properties refer to the same memory
 * location: */
console.log('prototype ', tx1.calculateHash2 === tx2.calculateHash2) // true

/*
 * The same applies to any methods added to Transaction.prototype. Suppose
 * that you add a new method called displayTransaction that you want all
 * objects to share:
 * */
Transaction.prototype.displayTransaction = function displayTransaction() {
  return `Transaction from ${this.sender} to ${this.recipient}`
}

// console.log(tx1.displayTransaction())
// tx1.displayTransaction is not a function
/*
 * The displayTransaction method is not available on the tx1 object. This is
 * because the method is added to the Transaction prototype, not the
 * HashTransaction prototype. To fix this, you need to link the
 * HashTransaction prototype to the Transaction prototype:
 * */

// check
console.log(
  'is Transaction prototype of tx',
  Transaction.prototype.isPrototypeOf(tx),
) // false

console.log('----------------------')
// ------------------------------------------------------------------------

// Linking prototypes with Object.create

/*
 * You can fix this problem easily. As before, you can use Object.create. The
 * following listing shows the complete prototype configuration.
 * */

function TransactionC(sender, recipient) {
  this.sender = sender
  this.recipient = recipient
}

TransactionC.prototype.displayTransaction = function () {
  return `Transaction from ${this.sender} to ${this.recipient}`
}

function HashTransactionC(sender, recipient) {
  // when the function is called without the new keyword
  // it will return a new instance of HashTransactionC
  // with the sender and recipient properties set
  if (!new.target) {
    return new HashTransactionC(sender, recipient)
  }
  TransactionC.call(this, sender, recipient)
}

/*
 * Links prototypes for the lookup mechanism to work in case you need to
 * resolve properties from Transaction.prototype
 * */
HashTransactionC.prototype = Object.create(TransactionC.prototype)

/*
 * Fixes or sets the constructor value.
 * Without this line, tx would be a Transaction object or constructed from
 * Transaction.
 * */
HashTransactionC.prototype.constructor = HashTransactionC

// After setting up the prototype chain,
// you can add the calculateHash method
HashTransactionC.prototype.calculateHashC = function () {
  const data = [this.sender, this.recipient].join('')
  let hash = 0,
    i = 0
  while (i < data.length) {
    hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0
  }
  return hash ** 2
}

const txC = new HashTransactionC('luis@tjoj.com', 'luke@tjoj.com')
const tx2C = new HashTransactionC('luis@tjoj.com', 'luke@tjoj.com')

console.log('txC ', txC)

// txC is an instance of HashTransactionC
// HashTransactionC is a constructor function
// and its prototype is linked to the TransactionC prototype

console.log(
  'TransactionC.prototype.isPrototypeOf(txC) ',
  TransactionC.prototype.isPrototypeOf(txC),
) // true

console.log(
  'HashTransactionC.prototype.isPrototypeOf(txC) ',
  HashTransactionC.prototype.isPrototypeOf(txC),
) // true
// both TransactionC and HashTransactionC prototypes are in the prototype chain of txC

// calling the displayTransaction method
// which is added to the Transaction prototype
// which is linked to the HashTransaction prototype.
// Calling the displayTransaction method with the txC object
// which is an instance of HashTransaction
console.log('txC.calculateHashC ', txC.displayTransaction())

// both txC and tx2C share the same displayTransaction method
console.log(txC.displayTransaction === tx2C.displayTransaction) // true

console.log('txC.__proto__; ', txC.__proto__)
/*
TransactionC {
  constructor: [Function: HashTransactionC],
  calculateHashC: [Function (anonymous)]
}
 */

console.log('tx.__proto__.__proto__; ', txC.__proto__.__proto__)
//  { displayTransaction: [Function: displayTransaction] }

// ------------------------------------------------------------------------

// Difference between __proto__ and prototype

/*
 * the difference is, __proto__is the object
 * used in the lookup chain to resolve methods, whereas prototype is the
 * object used to build __proto__when you create an object with new.
 *  */

// ------------------------------------------------------------------------