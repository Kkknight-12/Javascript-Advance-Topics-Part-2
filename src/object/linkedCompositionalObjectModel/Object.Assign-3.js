// Object.assign()
/*
 * The Object.assign() method is used to copy the values of all enumerable
 * own properties from one or more source objects to a target object. It
 * will return the target object.
 *
 * Here's a simple explanation of the code you provided:
 *
 * The doSomething function accepts a config object as an argument.
 * If no object is provided, it defaults to an empty object {}.
 * */

function doSomething(config = {}) {
  /*
   * Inside the function, Object.assign() is used to merge the config object
   * with a default object. The default object has properties foo, bar, and
   * baz with values 'foo', 'bar', and 'baz' respectively. If the config
   * object has any of these properties, their values will overwrite the
   * default values.
   * */
  config = Object.assign(
    {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz',
    },
    config,
  )
  /*
   * The function then logs a string that includes the values of foo, bar, and
   * baz from the config object.
   * */
  console.log(`Using config ${config.foo}, ${config.bar}, ${config.bar}`)
}

/*
 * When you call doSomething() without arguments, it uses the default values.
 * When you call doSomething({foo: 'hello'}), it overwrites the default value
 * of foo with 'hello'.
 *  */
doSomething() // foo, bar, bar
doSomething({ foo: 'hello' }) // hello, bar, bar

// ---------------------------------------------------------------------------

const objA = {
  a: 'a',
}
const objB = {
  b: 'b',
}

console.log(Object.assign({}, objA, objB)) //{ a: 'a', b: 'b' }

/*
 * In this case, all the objects in question have their properties as
 * enumerable: true, which means that Object.assign will scan and copy them.
 * */

// ---------------------------Object.defineProperty-------------------------------

// Object.defineProperty
// Now consider a non-enumerable property, which will be skipped:

const a = {
  a: 'a',
}

const b = {}

// with Object.defineProperty, making b.b non-enumerable
Object.defineProperty(b, 'b', {
  value: 'b',
  enumerable: false,
})

console.log(Object.assign({}, a, b)) //{ a: 'a' }

// ---------------------------Object.create-------------------------------------

// The Object.create() method creates a new object, using an existing object
// as the prototype of the newly created object.
const parent = {
  parent: 'parent',
}

// c is created with parent as its prototype.
const c = Object.create(parent)

// When you log c, it appears to be empty ({}) because the properties of the
// prototype are not directly visible.
console.log(c) // {}

// They are, however, accessible, if you try to access the parent property
// of c (i.e., c.parent), it will return 'parent'
console.log(c.parent) // parent

c.cKey = 'c'
console.log(c) // { cKey: 'c' }

console.log(Object.assign({}, c)) // { cKey: 'c' }

// ---------------------------Object.assign---------------------------------------

const sa = {
  sa: 'sa',
}

const sb = {
  sa: 'sb',
  sb: 'sb',
  sc: 'sc',
}

const sc = {
  sc: 'sc',
}

const obj = Object.assign({}, sa, sb, sc)
console.log(obj) // { sa: 'sb', sb: 'sb', sc: 'sc' }