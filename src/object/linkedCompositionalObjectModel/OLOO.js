/*
-> Object.create under the hood

* Object.create = function (proto, propertiesObject) {
  if (typeof proto !== "object" && typeof proto !== "function") {
    throw new TypeError("Object prototype may only be an object: " + proto);
  }

  function F() {}
  F.prototype = proto;
  return new F();
};

*  */

const MyStore = {
  init(element) {
    this.length = 0
    this.push(element)
  },
  push(b) {
    this[this.length] = b
    return ++this.length
  },
}

const Blockchain = Object.create(Mystore)
const chain = Object.create(Blockchain)

chain.init(createGenesisBlock)
// chain.push(new Block(...));
chain.length // 2

/*
 *
 * In this example, we first link the object MYstore and Blockchain, then we
 *  link the object chain ( which we consider to be actual instance object
 *  with all the functionality) with blockchain, In this definition my
 *  store  */