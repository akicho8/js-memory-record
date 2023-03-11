import MemoryRecord from '../src/memory_record.js'

class Fruit extends MemoryRecord {
  static get define() {
    return [
      { key: "a",  name: "alice", },
      { key: "b",  name: "bob",   },
    ]
  }

  static lookup(key) {
    return super.lookup(key) || this.invert_table[key]
  }

  static get invert_table() {
    if (this._invert_table != null) {
      return this._invert_table
    }
    this._invert_table = this.memory_record_create_index_by(["name"])
    return this._invert_table
  }
}

console.log(Fruit.fetch("alice").key)
