// -*- compile-command: "babel-node 0000_define.js" -*-

import MemoryRecord from '../src/memory_record.js'

class Fruit extends MemoryRecord {
  static get define() {
    return [
      { key: "a",  name: "name1", },
    ]
  }
}

console.log(Fruit.fetch("a").name)
Fruit.memory_record_reset([{ key: "a",  name: "name2" }])
console.log(Fruit.fetch("a").name)
