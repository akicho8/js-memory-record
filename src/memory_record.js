// Example.
//
//   import MemoryRecord from "./memory_record"
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

export default class MemoryRecord {
  static get define() {
    throw new Error(`${this.name}.define() is not implemented`)
  }

  static memory_record_reset(records) {
    this._values     = undefined
    this._keys_hash  = undefined
    this._codes_hash = undefined
    this._keys       = undefined
    this._codes      = undefined
    this._names      = undefined

    this._records = records

    return this
  }

  static memory_record_create_index_by(columns) {
    return this.values.reduce((a, e) => {
      columns.forEach(column => {
        const v = e[column]
        if (v != null) {
          if (v in a) {
            throw new Error([
              `${this.name}#${column} ${JSON.stringify(v)} is duplicate`,
              `Existing: ${JSON.stringify(Object.keys(a))}`,
              `Conflict: ${JSON.stringify(e)}`,
            ].join("\n"))
          }
          a[v] = e
        }
      })
      return a
    }, {})
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

  static fetch_if(key) {
    if (key != null) {
      return this.fetch(key)
    }
  }

  static lookup_or_first(key) {
    return this.lookup(key) || this.values[0]
  }

  static get values() {
    if (this._values !== undefined) {
      return this._values
    }
    this._values = _.map(this.__source_records, (e, i) => {
      e = Object.assign({}, e, {index: i})
      if (!("code" in e)) {
        e = Object.assign({}, e, {code: i})
      }
      if (!("key" in e)) {
        e = Object.assign({}, e, {key: `_key${i}`})
      }
      return Object.freeze(new this(e))
    })
    return this._values
  }

  static get keys_hash() {
    if (this._keys_hash != null) {
      return this._keys_hash
    }
    this._keys_hash = this.memory_record_create_index_by(["key"])
    return this._keys_hash
  }

  static get codes_hash() {
    if (this._codes_hash != null) {
      return this._codes_hash
    }
    this._codes_hash = this.memory_record_create_index_by(["code"])
    return this._codes_hash
  }

  static get keys() {
    if (this._keys != null) {
      return this._keys
    }
    this._keys = Object.keys(this.keys_hash)
    return this._keys
  }

  static get codes() {
    if (this._codes != null) {
      return this._codes
    }
    this._codes = this.values.map(e => e.code)
    return this._codes
  }

  static get names() {
    if (this._names != null) {
      return this._names
    }
    this._names = this.values.map(e => e.name)
    return this._names
  }

  static get count() {
    return this.values.length
  }

  // private
  static get __source_records() {
    if (this._records != null) {
      return this._records
    }
    this._records = this.define
    return this._records
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

if (typeof process !== "undefined" && process.argv[1] === __filename) {
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
