# MemoryRecord

[![Build Status](https://travis-ci.org/akicho8/js-memory-record.svg?branch=master)](https://travis-ci.org/akicho8/js-memory-record)
[![Maintainability](https://api.codeclimate.com/v1/badges/010e25e22f84080afe2d/maintainability)](https://codeclimate.com/github/akicho8/js-memory-record/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4de340004a69572e32a0/test_coverage)](https://codeclimate.com/github/akicho8/js-memory-record/test_coverage)
[![npm version](https://badge.fury.io/js/js-memory-record.svg)](https://badge.fury.io/js/js-memory-record)
[![GitHub version](https://badge.fury.io/gh/akicho8%2Fjs-memory-record.svg)](https://badge.fury.io/gh/akicho8%2Fjs-memory-record)

## Description

A simple library that handles a few records easily.

## Install

```shell
npm install js-memory-record
```

## Simplest Example

```js
class Gender extends MemoryRecord {
  static get define() {
    return [
      { key: "male"   },
      { key: "female" },
    ]
  }
}

gender = Gender.fetch("male")
gender.name          // => "male"
gender.code          // => 0

Gender.fetch(0).name // => "male"
```

## More Example

### Records Define

Return an array of Hash structures in `define()`

```js
import MemoryRecord from 'js-memory-record'

export default class Fruit extends MemoryRecord {

  // Record definition.

  static get define() {
    return [
      { key: "apple",  name: "Poison Apple", price: 120, },
      { key: "melon",  name: "Green Melon",  price: 800, },
      { key: "peach",  name: "Pink Piece",   price: 200, },
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
```

### fetch(key) - Key Access

Basic access by this method.

```js
Fruit.fetch("apple").key        // => "apple"
Fruit.fetch("apple").name       // => "Poison Apple"
Fruit.fetch("apple").code       // => 0
Fruit.fetch("apple").index      // => 0
```

### fetch(code) - Code Access

Code is something like database ID.
Allocate in order from 0.
Use it when you want to access by special index.

```js
Fruit.fetch(0).name                     // => "Poison Apple"
Fruit.fetch(0) === Fruit.fetch("apple") // => true
```

### Attributes can be referred to as properties

```js
Fruit.fetch("apple").price      // => 120
```

### Additional Defined Instance Methods

Define the Instance Metod freely and return the attributes in an easy-to-use form.
This part is one of the merits of introducing this library.

```js
Fruit.fetch("apple").special_price // => 60
Fruit.fetch("apple").full_name     // => "Poison Apple (Now 60 Gold)"
```

### Unknown Key Access

There is no `lookup()` exception.

```js
Fruit.lookup("grape")           // => null
```

In case of `fetch()` we will throw an exception.

```js
Fruit.fetch("grape")            // (Throw Error)
```

The error message of the exception is displayed as follows.

```text
Error: Fruit.fetch("grape") does not match anything
keys: ["apple","melon","peach"]
codes: [0,1,2]
```

The cause of the error is displayed in an easy-to-understand manner.

### Array Access

```js
Fruit.values                    // => [{...}, {...}, {...}]
```

```js
Fruit.values.map(e => e.key)    // => ["apple", "melon", "peach"]
```

### Other Class Methods

```js
Fruit.keys      // => ["apple", "melon", "peach"]
Fruit.codes     // => [0, 1, 2]
Fruit.names     // => ["Poison Apple", "Green Melon", "Pink Piece"],
```

We do not use this class methods much. But it may be useful for debugging.

### code can be explicitly specified

```js
static get define() {
  return [
    { code: 1, key: "apple", },
    { code: 2, key: "melon", },
    { code: 4, key: "peach", },
  ]
}
```

```js
Fruit.codes    // => [1, 2, 4]
```

This is like managing database ID yourself. We do not recommend it.
It is only useful if you need consistency with old data.

### How to reset the array of records later

Replace the entire record internally held.
I do not recommend this method much.
But it may be useful in emergency.

```js
Fruit.memory_record_reset([
  { key: "foo" },
  { key: "bar" },
])

Fruit.fetch("foo").key    // => "foo"
```

## Build Setup

```bash
# install dependencies
npm install

# build for production with minification
npm run build

# run unit tests
npm test
```
memory_record_reset
