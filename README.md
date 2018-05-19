# js-memory-record

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

or

```shell
yarn add js-memory-record
```

## How To Use

### Define

```javascript
import { MemoryRecord } from 'memory_record'

class Fruit extends MemoryRecord {

   // Record definition.
   // key is required.

  static get define() {
    return [
      { key: "melon",  name: "メロン", price: 800, },
      { key: "apple",  name: "りんご", price: 120, },
      { key: "peach",  name: "もも",   price: 200, },
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
```

### Key Access

```javascript
Fruit.fetch("apple").key        // => "apple"
Fruit.fetch("apple").name       // => "りんご"
Fruit.fetch("apple").code       // => 1
```

### Code Access

Code is something like database ID.
Allocate in order from 0.

```javascript
Fruit.fetch(1).code             // => 1
Fruit.fetch(1).key              // => "apple"
```

### Additional Defined Methods

```javascript
Fruit.fetch("apple").price      // => 120
Fruit.fetch("apple").half_price // => 60
```

### Unknown Key Access

```javascript
Fruit.lookup("grape")           // => null
Fruit.fetch("grape")            // => Throw Error Exception
```

### Array Access

```javascript
Fruit.values                    // [{...}, {...}, {...}]
```

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
