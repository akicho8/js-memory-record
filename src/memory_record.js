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
    console.warn("not implemented")

    return [
      { key: "(key_x)", },
      { key: "(key_y)", },
    ]
  }

  static lookup(key) {
    if (key instanceof this) {
      return key
    }
    if (typeof key === "number") {
      return this.values[key]
    } else {
      return this.values_map[key]
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

  static get values_map() {
    this._values_map = this._values_map || _.reduce(this.define, (a, e, i) => { // http://devdocs.io/lodash~4/index#reduce
      a[e.key] = Object.freeze(new this(Object.assign({}, e, {code: i})))
      return a
    }, {})
    return this._values_map
  }

  static get keys() {
    this._keys = this._keys || Object.keys(this.values_map)
    return this._keys
  }

  static get codes() {
    this._codes = this._codes || this.values.map(e => e.code)
    return this._codes
  }

  static get values() {
    this._values = this._values || Object.values(this.values_map)
    return this._values
  }

  constructor(attributes) {
    Object.defineProperty(this, "attributes", {value: attributes, writable: false, enumerable: false, configurable: false})

    _.forIn(attributes, (e, k) => {
      Object.defineProperty(this, k, {value: e, writable: false, enumerable: true, configurable: false})
    })

    if (!this.hasOwnProperty("name")) {
      Object.defineProperty(this, "name", {value: attributes.name || this.key.toString(), writable: false, enumerable: true, configurable: false})
    }
  }

  // get code() {
  //   return this.attributes.code
  // }

  // get key() {
  //   return this.attributes.key
  // }

  // get name() {
  //   return this.attributes.name || this.key.toString()
  // }
}

export { MemoryRecord }

if (process.argv[1] === __filename) {
  class Foo extends MemoryRecord {
    static get define() {
      return [
        { key: "black", name: '☗', },
        { key: "white", name: '☖', },
      ]
    }
  }

  const record = Foo.values[0]
  console.log(record.key)
  console.log(record.code)
  console.log(record.name)

  console.log(Foo.values)
  console.log(Foo.lookup("black").name)
  console.log(Foo.lookup("black").code)

  let v = Foo.lookup("black")
  console.log(v instanceof Foo)

  console.log(Foo.lookup(0))
  console.log(Foo.lookup(1))
  console.log(Foo.lookup(2))

  console.log(Foo.values[0] === Foo.values[0])

  console.log(Foo.values.map(e => e.key))
  console.log(Object.keys(Foo.values_map))
  console.log(Foo.fetch('unknown'))
}
