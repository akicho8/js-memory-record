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

or

```shell
yarn add js-memory-record
```

## Example

### Records Define

Return an array of Hash structures in `define()`

```js
import { MemoryRecord } from 'js-memory-record'

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
  // Define it when accessing other than key, name and other attributes

  get half_price() {
    return Math.ceil(this.price / 2)
  }
}

export { Fruit }
```

### fetch(key) - Key Access

Basic access by this method.

```js
Fruit.fetch("apple").key        // => "apple"
Fruit.fetch("apple").name       // => "りんご"
Fruit.fetch("apple").code       // => 1
```

### fetch(code) - Code Access

Code is something like database ID.
Allocate in order from 0.
Use it when you want to access by special index.

```js
Fruit.fetch(1).code             // => 1
Fruit.fetch(1).key              // => "apple"
```

### Attributes can be referred to as properties

```js
Fruit.fetch("apple").price      // => 120
```

### Additional Defined Instance Methods

Define the Instance Metod freely and return the attributes in an easy-to-use form. This part is one of the merits of introducing this library.

```js
Fruit.fetch("apple").half_price // => 60
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
keys: ["melon","apple","peach"]
codes: [0,1,2]
```

The cause of the error is displayed in an easy-to-understand manner.

### Array Access

```js
Fruit.values                    // [{...}, {...}, {...}]
```

```js
Fruit.values.map(e => e.name)   // ["melon", "apple", "peach"]
```

### Other Class Methods

```js
Fruit.keys                      // ["melon", "apple", "peach"]
Fruit.codes                     // [0, 1, 2]
```

We do not use this class methods much. But it may be useful for debugging.

## TODO

- Do not overwrite code if there is definition of code

## Build Setup

```bash
# install dependencies
npm install

# build for production with minification
npm run build

# run unit tests
npm unit
```
