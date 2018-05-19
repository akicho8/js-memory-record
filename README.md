# js-memory-record

[![Build Status](https://travis-ci.org/akicho8/js-memory-record.svg?branch=master)](https://travis-ci.org/akicho8/js-memory-record)
[![Maintainability](https://api.codeclimate.com/v1/badges/010e25e22f84080afe2d/maintainability)](https://codeclimate.com/github/akicho8/js-memory-record/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4de340004a69572e32a0/test_coverage)](https://codeclimate.com/github/akicho8/js-memory-record/test_coverage)
[![npm version](https://badge.fury.io/js/js-memory-record.svg)](https://badge.fury.io/js/js-memory-record)
[![GitHub version](https://badge.fury.io/gh/akicho8%2Fjs-memory-record.svg)](https://badge.fury.io/gh/akicho8%2Fjs-memory-record)

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

## How To Use

```javascript
import { MemoryRecord } from 'memory_record'

class Fruit extends MemoryRecord {

   // Record definition.
   // key is required.

  static get define() {
    return [
      { key: "apple",  name: "りんご", price: 120, },
      { key: "peach",  name: "もも",   price: 200, },
      { key: "melon",  name: "メロン", price: 800, },
    ]
  }

  // Define an instance method referencing an attribute.
  // Define it when accessing other than key, name, code.

  static get price() {
    return this.attributes["price"]
  }

  static get half_price() {
    return Math.ceil(this.price / 2)
  }
}

// Key Access

Fruit.fetch("peach").key        // => "peach"
Fruit.fetch("peach").name       // => "もも"
Fruit.fetch("peach").code       // => 1

// Code Access
// code is something like database ID. Allocate in order from 0.

Fruit.fetch(1).code             // => 1
Fruit.fetch(1).key              // => "peach"

// Accessible as it was defined separately

Fruit.fetch("peach").price      // => 200
Fruit.fetch("peach").half_price // => 100

// Unknown key

Fruit.lookup("grape")           // => null
Fruit.fetch("grape")            // => Error

// Unknown key

Fruit.lookup("grape")           // => null
Fruit.fetch("grape")            // => Error

// Array access

Fruit.values                    // [{...}, {...}, {...}]
```
