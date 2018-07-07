// -*- compile-command: "babel-node 0000_example.js" -*-

import { MemoryRecord } from '../src/memory_record.js'

class Fruit extends MemoryRecord {

   // Record definition.
   // key is required.

  static get define() {
    return [
      { key: "apple",  name: "Poison Apple",   price: 120, },
      { key: "melon",  name: "Green Melon", price: 800, },
      { key: "peach",  name: "Pink Piece",  price: 200, },
    ]
  }

  // Define an instance method referencing an attribute.
  // Define it when accessing other than key, name and other attributes

  get full_name() {
    return `${this.name} (Now ${this.special_price} Gold)`
  }

  get special_price() {
    return Math.ceil(this.price / 2)
  }
}

console.log(Fruit.fetch("apple").key)
console.log(Fruit.fetch("apple").name)
console.log(Fruit.fetch("apple").full_name)
console.log(Fruit.fetch("apple").code)



