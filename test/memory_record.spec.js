// -*- compile-command: "jest --config jest.conf.js" -*-

import MemoryRecord from '@/memory_record.js'

class MyModel extends MemoryRecord {
  static get define() {
    return [
      { key: "alice", },
      { key: "bob",   },
      { code: 7,      },
    ]
  }

  get double_name() {
    return [this.name, this.name].join("-")
  }
}

class EmptyModel extends MemoryRecord {
}

class MyModel2 extends MemoryRecord {
  static get define() {
    return [
      { key: "a",  name: "name1", },
    ]
  }
}

describe('MemoryRecord', () => {
  it('lookup', () => {
    expect(MyModel.lookup("alice").key).toEqual("alice")
    expect(MyModel.lookup(0).key).toEqual("alice")
    expect(MyModel.lookup(-1)).toEqual(undefined)
  })

  it('Automatic assignment', () => {
    const r = MyModel.lookup(7)
    expect(r.key).toEqual("_key2")
    expect(r.name).toEqual("_key2")
  })

  it('keys', () => {
    expect(MyModel.keys).toEqual(["alice", "bob", "_key2"])
  })

  it('codes', () => {
    expect(MyModel.codes).toEqual([0, 1, 7])
  })

  it('names', () => {
    expect(MyModel.names).toEqual(["alice", "bob", "_key2"])
  })

  it('count', () => {
    expect(MyModel.count).toEqual(3)
  })

  it('fetch', () => {
    expect(() => { MyModel.fetch("unknown") }).toThrow()
  })

  it('fetch_if', () => {
    expect(MyModel.fetch_if(null)).toEqual(undefined)
    expect(MyModel.fetch_if(undefined)).toEqual(undefined)
    expect(() => { MyModel.fetch_if("") }).toThrow()
  })

  it('lookup_or_first', () => {
    expect(MyModel.lookup_or_first("carol").name).toEqual("alice")
  })

  it('values', () => {
    MyModel.values
  })

  it('name', () => {
    expect(MyModel.values[0].name).toEqual("alice")
  })

  it('code', () => {
    expect(MyModel.values[0].code).toEqual(0)
  })

  it('instance methods', () => {
    expect(MyModel.values[0].double_name).toEqual("alice-alice")
  })

  it('attributes', () => {
    expect(MyModel.values[0].attributes).toEqual({code: 0, key: "alice", index: 0})
  })

  it('EmptyModel', () => {
    expect(() => { EmptyModel.values }).toThrow()
  })

  it('memory_record_reset', () => {
    const retval = MyModel2.memory_record_reset([{ key: "a", name: "name2"}])
    expect(MyModel2.fetch("a").name).toEqual("name2")
    expect(retval).toEqual(MyModel2)
  })
})
