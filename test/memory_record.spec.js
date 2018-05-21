// -*- compile-command: "jest --config jest.conf.js" -*-

import { MemoryRecord } from '@/memory_record.js'

class MyModel extends MemoryRecord {
  static get define() {
    return [
      { key: "alice", },
      { key: "bob",   },
    ]
  }

  get double_name() {
    return [this.name, this.name].join("-")
  }
}

class EmptyModel extends MemoryRecord {
}

describe('MemoryRecord', () => {
  it('lookup', () => {
    expect(MyModel.lookup("alice").key).toEqual("alice")
    expect(MyModel.lookup(0).key).toEqual("alice")
    expect(MyModel.lookup(-1)).toEqual(undefined)
  })

  it('fetch', () => {
    expect(() => { MyModel.fetch("unknown") }).toThrow()
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
    expect(MyModel.values[0].attributes).toEqual({code: 0, key: "alice"})
  })

  it('EmptyModel', () => {
    expect(() => { EmptyModel.values }).toThrow()
  })
})
