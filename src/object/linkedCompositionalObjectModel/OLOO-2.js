/*
 * The OLOO (Objects Linked to Other Objects) pattern, as presented by Kyle
 *  Simpson, is a way of structuring JavaScript code that emphasizes the
 *  peer-to-peer relationship between objects, rather than a parent-child
 *  relationship. This pattern is based on the concept of differential
 *  inheritance, where objects are seen as peers that link together and
 *  delegate functionality to each other.
 *
 * In the OLOO pattern, objects are created by linking them to existing
 * objects. This is done using the Object.create() method, which creates a
 * new object with the specified prototype object and properties. This method
 * is a simpler and more straightforward way to set up object linkage
 * compared to the traditional constructor function pattern.
 *
 *  */

// Object.create = function (proto, propertiesObject) {
//   if (typeof proto !== 'object' && typeof proto !== 'function') {
//     throw new TypeError('Object prototype may only be an Object: ' + proto)
//   }
//
//   function F() {}
//   F.prototype = proto
//   return new F()
// }

//  an example of the OLOO (Objects Linked to Other Objects) pattern
/*
 * OLOO is based on the concept of differential inheritance, where objects are
 * seen as peers that link together and delegate functionality to each other.
 * */

const MyStore = {
  // initialize the store with an element
  init(element) {
    this.length = 0
    // then call the push method to add the element to the store
    this.push(element)
  },

  // add a new element to the store
  push(b) {
    this[this.length] = b
    return ++this.length
  },
}

const Blockchain = Object.create(MyStore)
const chain = Object.create(Blockchain)
/*
 * MyStore is an object that has methods init and push. Blockchain is an
 * object that is linked to MyStore using Object.create(). This means that
 * Blockchain has access to MyStore's methods. Similarly, chain is an object
 * that is linked to Blockchain, and therefore also has access to MyStore's
 * methods.
 *
 * Blockchain is an object that is linked to MyStore using Object.create().
 * This means that Blockchain has access to MyStore's methods. Similarly,
 * chain is an object that is linked to Blockchain, and therefore also has
 * access to MyStore's methods.
 *  */

/*
 * The init method is used to initialize a new block with a given element,
 * and the push method is used to add the block to the blockchain. The
 * chain.init(createGenesisBlock) line of code is creating the first block in
 * the blockchain, also known as the genesis block.
 *  */
function Block(data, previousHash) {
  this.data = data
  this.previousHash = previousHash
  this.hash = this.calculateHash()
}
Block.prototype.calculateHash = function () {
  return this.data + this.previousHash
}

function createGenesisBlock() {
  return new Block('Genesis Block', '0')
}

chain.init(createGenesisBlock)
chain.push(new Block('Block Data', 'Previous Block Hash'))
console.log(chain) // 2

// the objects are linked properly:
console.log(MyStore.isPrototypeOf(Blockchain)) // true
console.log(chain.__proto__.init) // [Function: init]

/*
 * The OLOO pattern separates the declaration of an object from its use,
 * allowing you to define and lazily pass around the actual object
 * representation as a first-class object, similar to passing a class
 * definition around. Then you can initialize this lazily built, minimal
 * object with its full set of data only when needed.
 *
 * This pattern resembles the Builder pattern in object-oriented design,
 * which separates the construction of a complex object from its
 * representation.
 *
 * A noticeable difference with OLOO compared with constructor functions and
 * classes is that the reliance on the prototypal inheritance is much more
 * controlled and less exposed.
 *
 * When MyStore.isPrototypeOf(Blockchain) is true, you can’t inadvertently
 * change the shape of all initialized objects, protecting you from
 * prototype pollution.
 *
 * In fact, MyStore and Blockchain are not constructor functions at all, so
 * they do not have a prototype property.
 *  */

console.log(MyStore.prototype) // undefined
console.log(Blockchain.prototype) // undefined

console.log('---------------------  OLOO  ---------------------')
// ---------------------  OLOO  ---------------------

/*
 * The Animal object will have a method eat, and the Dog object will be linked
 * to Animal and have its own method bark.
 *  */

const Animal = {
  // initialize the animal with a name
  init(name) {
    this.name = name
    return this
  },

  eat() {
    return `${this.name} is eating.`
  },
}

const Dog = Object.create(Animal)

// override the init method of Animal
// new init also sets the breed property
Dog.init = function (name, breed) {
  // call the init method of Animal from within Dog
  Animal.init.call(this, name)
  // set the breed property on the Dog object
  this.breed = breed
  return this
}

Dog.bark = function () {
  return `${this.name} is barking.`
}

/*
 * In this example, Animal is an object with a method init to initialize its
 * name property and a method eat. Dog is an object that is linked to Animal
 * using Object.create(). This means that Dog has access to Animal's methods.
 *
 * Dog then overrides the init method to include a breed property. It also
 * adds a new method bark. The line Animal.init.call(this, name); is used to
 * call the init method of Animal from within Dog. This sets the name
 * property on the Dog object.
 *  */

const myDog = Object.create(Dog).init('Rex', 'German Shepherd')
console.log(myDog.eat()) // Rex is eating.
console.log(myDog.bark()) // Rex is barking.