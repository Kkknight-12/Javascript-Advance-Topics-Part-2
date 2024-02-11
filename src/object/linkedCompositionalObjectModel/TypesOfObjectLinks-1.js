/*
 * In JavaScript, you can associate objects in two ways:
 * implicitly and
 * explicitly
 *  */

// 1. Implicit Association

const UpperCaseFormatter = {
  format(msg) {
    return msg.toUpperCase()
  },
}

const Foo = Object.create(UpperCaseFormatter)
Foo.saySomething = function saySomething(msg) {
  console.log(this.format(msg))
}
Foo.saySomething('hello') // HELLO

/*
 *  Foo is an object that is linked to UpperCaseFormatter through the
 *  Object.create method. This means that UpperCaseFormatter is the prototype
 *  of Foo.
 *  When saySomething method is called on Foo, it first looks for the
 *  format method on Foo itself. Not finding it there, it looks on Foo's
 *  prototype, which is UpperCaseFormatter, and finds the format method
 *  there. This is an example of implicit linking or delegation.
 *
 * The term "implicit" is used because the link between  Foo and
 * UpperCaseFormatter is not directly visible in the code where the format
 * method is called. Instead, the JavaScript runtime implicitly follows the
 * prototype chain to find the format method.
 *  */

// --------------------------------------------

// 2. Explicit Association

// In JavaScript, you can also explicitly associate objects by setting properties
// on one object that refer to another object.

const UpperCaseFormatterE = {
  format: function (msg) {
    return msg.toUpperCase()
  },
}

const FooE = {
  // set the formatter property to UpperCaseFormatter
  formatter: UpperCaseFormatterE,
  saySomething: function print(msg) {
    console.log(this.formatter !== null ? this.formatter.format(msg) : msg)
  },
}

FooE.saySomething('hello') // Prints HELLO