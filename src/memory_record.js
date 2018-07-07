// Example.
//
//   import { MemoryRecord } from "./memory_record"
//
//   class Foo extends MemoryRecord {
//     static get define() {
//       return [
//         { key: "black", name: '☗', },
//         { key: "white", name: '☖', },
//       ]
//     }
//
//     get flip() {
//       return Foo.values[(this.code + 1) % Foo.values.length]
//     }
//   }
//
//   Foo.lookup("black").key           // => "black"
//   Foo.lookup(1).key                 // => "white"
//   Foo.values[0] === Foo.values[0]   // => true
//

import _ from "lodash"

class MemoryRecord {
  static get define() {
    throw new Error(`${this.name}.define() is not implemented`)
  }

  static lookup(key) {
    if (key instanceof this) {
      return key
    }
    if (typeof key === "number") {
      return this.codes_hash[key]
    } else {
      return this.keys_hash[key]
    }
  }

  static fetch(key) {
    const element = this.lookup(key)
    if (!element) {
      throw new Error([
        `${this.name}.fetch(${JSON.stringify(key)}) does not match anything`,
        `keys: ${JSON.stringify(this.keys)}`,
        `codes: ${JSON.stringify(this.codes)}`,
      ].join("\n"))
    }
    return element
  }

  static get values() {
    return this._values || _.map(this.define, (e, i) => {
      e = Object.assign({}, e, {index: i})
      if (!("code" in e)) {
        e = Object.assign({}, e, {code: i})
      }
      if (!("key" in e)) {
        e = Object.assign({}, e, {key: `_key${i}`})
      }
      return Object.freeze(new this(e))
    })
  }

  static get keys_hash() {
    this._keys_hash = this._keys_hash || _.reduce(this.values, (a, e) => { // http://devdocs.io/lodash~4/index#reduce
      if (e.key in a) {
        throw new Error([
          `${this.name}#key ${JSON.stringify(e.key)} is duplicate`,
          `Existing: ${JSON.stringify(Object.keys(a))}`,
          `Conflict: ${JSON.stringify(e)}`,
        ].join("\n"))
      }
      a[e.key] = e
      return a
    }, {})
    return this._keys_hash
  }

  static get codes_hash() {
    this._codes_hash = this._codes_hash || _.reduce(this.values, (a, e) => { // http://devdocs.io/lodash~4/index#reduce
      if (e.code in a) {
        throw new Error([
          `${this.name}#code ${JSON.stringify(e.code)} is duplicate`,
          `Existing: ${JSON.stringify(Object.keys(a))}`,
          `Conflict: ${JSON.stringify(e)}`,
        ].join("\n"))
      }
      a[e.code] = e
      return a
    }, {})
    return this._codes_hash
  }

  static get keys() {
    this._keys = this._keys || Object.keys(this.keys_hash)
    return this._keys
  }

  static get codes() {
    // In case of Object.keys(this.codes_hash) code becomes a character string
    this._codes = this._codes || this.values.map(e => e.code)
    return this._codes
  }

  static get names() {
    this._names = this._names || this.values.map(e => e.name)
    return this._names
  }

  constructor(attributes) {
    Object.defineProperty(this, "attributes", {value: attributes, writable: false, enumerable: false, configurable: false})

    _.forIn(attributes, (e, k) => {
      Object.defineProperty(this, k, {value: e, writable: false, enumerable: true, configurable: false})
    })

    // If name is not defined, it returns string converted from key
    // In the case of this.hasOwnProperty ("name") see parents. Parents also look at in.
    if (!("name" in this)) {
      Object.defineProperty(this, "name", {value: attributes.name || attributes.key.toString(), writable: false, enumerable: true, configurable: false})
    }
  }
}

export { MemoryRecord }

if (process.argv[1] === __filename) {
  class Foo extends MemoryRecord {
    static get define() {
      return [
        { key: "black", name: '☗', },
        { key: "white", name: '☖', },
        { code: 7, },
      ]
    }
  }

  console.log(Foo.keys)
  console.log(Foo.codes)

  const record = Foo.values[0]
  console.log(record.key)
  console.log(record.code)
  console.log(record.name)

  console.log(Foo.values)
  console.log(Foo.lookup("black").name)
  console.log(Foo.lookup("black").code)

  console.log(Foo.lookup("_key2").name)

  let v = Foo.lookup("black")
  console.log(v instanceof Foo)

  console.log(Foo.lookup(0))
  console.log(Foo.lookup(1))
  console.log(Foo.lookup(2))

  console.log(Foo.values[0] === Foo.values[0])

  console.log(Foo.values.map(e => e.key))
  console.log(Object.keys(Foo.keys_hash))
  console.log(Foo.fetch('unknown'))
}
