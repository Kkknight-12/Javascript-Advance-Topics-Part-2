// Object.create

/*
 * Object.create creates a new object with the specified prototype object and properties.
 *
 * Syntax -> Object.create(proto, [propertiesObject])
 *
 * - It creates a link between the prototype and the new object
 *
 * - new object inherits properties from the prototype object, it has access
 *   to the prototype's properties and methods
 *
 * - when we call a property or method on the new object, JavaScript looks
 *  for it in the new object if it doesn't find it, it looks for it in the
 *  prototype object and so on up the prototype chain.
 *
 * - the hidden __proto__ property as being the bridge that allows you to
 *  traverse the chain.
 *  */

const proto = {
  sender: 'sender@gmail.com',
}

const child = Object.create(proto)
console.log('child object ', child) //  {}

child.recipient = 'recipient@gmail.com'
// child.sender = 'none'

console.log('child object ', child) //   { recipient: 'recipient@gmail.com' }

// sending exist in the prototype
console.log('sender ', child.sender) //  sender@gmail.com

// -----------------------------------------------------------------------------

// Object.getPrototypeOf

// Object.getPrototypeOf returns the prototype of the specified object
console.log(Object.getPrototypeOf(child)) // proto

// -----------------------------------------------------------------------------

// Object.create with propertiesObject ( second parameter )

const transaction = {
  sender: 'sender@gg.com',
  recipient: 'recipient@gg.com',
}

const moneyTransactionS = Object.create(transaction, {
  funds: {
    value: 0.0,
    enumerable: true,
    writable: true,
    configurable: false,
  },
})

console.log('funds ', moneyTransactionS.funds) //

for (const moneyTransactionSKey in moneyTransactionS) {
  console.log(moneyTransactionSKey) // funds, sender, recipient
}

// -----------------------------------------------------------------------------

// Object.setPrototypeOf

const obj = {}
const parent = { foo: 'bar' }

console.log(obj.foo)
// Expected output: undefined

// Set the prototype of the object to parent
Object.setPrototypeOf(obj, parent)

console.log(obj.foo) // bar

console.log('Object.getPrototypeOf ', Object.getPrototypeOf(obj)) //  { foo: 'bar' }

// when there is no prototype set it returns null
console.log('Object.getPrototypeOf ', Object.getPrototypeOf(parent))
