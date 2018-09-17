"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _freeze = require("babel-runtime/core-js/object/freeze");

var _freeze2 = _interopRequireDefault(_freeze);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MemoryRecord = function () {
  (0, _createClass3.default)(MemoryRecord, null, [{
    key: "memory_record_reset",
    value: function memory_record_reset(records) {
      this._values = undefined;
      this._keys_hash = undefined;
      this._codes_hash = undefined;
      this._keys = undefined;
      this._codes = undefined;
      this._names = undefined;

      this._records = records;
    }
  }, {
    key: "lookup",
    value: function lookup(key) {
      if (key instanceof this) {
        return key;
      }
      if (typeof key === "number") {
        return this.codes_hash[key];
      } else {
        return this.keys_hash[key];
      }
    }
  }, {
    key: "fetch",
    value: function fetch(key) {
      var element = this.lookup(key);
      if (!element) {
        throw new Error([this.name + ".fetch(" + (0, _stringify2.default)(key) + ") does not match anything", "keys: " + (0, _stringify2.default)(this.keys), "codes: " + (0, _stringify2.default)(this.codes)].join("\n"));
      }
      return element;
    }
  }, {
    key: "define",
    get: function get() {
      throw new Error(this.name + ".define() is not implemented");
    }
  }, {
    key: "values",
    get: function get() {
      var _this = this;

      if (this._values !== undefined) {
        return this._values;
      }
      this._values = _lodash2.default.map(this.__source_records, function (e, i) {
        e = (0, _assign2.default)({}, e, { index: i });
        if (!("code" in e)) {
          e = (0, _assign2.default)({}, e, { code: i });
        }
        if (!("key" in e)) {
          e = (0, _assign2.default)({}, e, { key: "_key" + i });
        }
        return (0, _freeze2.default)(new _this(e));
      });
      return this._values;
    }
  }, {
    key: "keys_hash",
    get: function get() {
      var _this2 = this;

      if (this._keys_hash !== undefined) {
        return this._keys_hash;
      }
      this._keys_hash = _lodash2.default.reduce(this.values, function (a, e) {
        if (e.key in a) {
          throw new Error([_this2.name + "#key " + (0, _stringify2.default)(e.key) + " is duplicate", "Existing: " + (0, _stringify2.default)((0, _keys2.default)(a)), "Conflict: " + (0, _stringify2.default)(e)].join("\n"));
        }
        a[e.key] = e;
        return a;
      }, {});
      return this._keys_hash;
    }
  }, {
    key: "codes_hash",
    get: function get() {
      var _this3 = this;

      if (this._codes_hash !== undefined) {
        return this._codes_hash;
      }
      this._codes_hash = _lodash2.default.reduce(this.values, function (a, e) {
        if (e.code in a) {
          throw new Error([_this3.name + "#code " + (0, _stringify2.default)(e.code) + " is duplicate", "Existing: " + (0, _stringify2.default)((0, _keys2.default)(a)), "Conflict: " + (0, _stringify2.default)(e)].join("\n"));
        }
        a[e.code] = e;
        return a;
      }, {});
      return this._codes_hash;
    }
  }, {
    key: "keys",
    get: function get() {
      if (this._keys !== undefined) {
        return this._keys;
      }
      this._keys = (0, _keys2.default)(this.keys_hash);
      return this._keys;
    }
  }, {
    key: "codes",
    get: function get() {
      if (this._codes !== undefined) {
        return this._codes;
      }

      this._codes = this.values.map(function (e) {
        return e.code;
      });
      return this._codes;
    }
  }, {
    key: "names",
    get: function get() {
      if (this._names !== undefined) {
        return this._names;
      }
      this._names = this.values.map(function (e) {
        return e.name;
      });
      return this._names;
    }
  }, {
    key: "__source_records",
    get: function get() {
      if (this._records !== undefined) {
        return this._records;
      }
      this._records = this.define;
      return this._records;
    }
  }]);

  function MemoryRecord(attributes) {
    var _this4 = this;

    (0, _classCallCheck3.default)(this, MemoryRecord);

    Object.defineProperty(this, "attributes", { value: attributes, writable: false, enumerable: false, configurable: false });

    _lodash2.default.forIn(attributes, function (e, k) {
      (0, _defineProperty2.default)(_this4, k, { value: e, writable: false, enumerable: true, configurable: false });
    });

    if (!("name" in this)) {
      Object.defineProperty(this, "name", { value: attributes.name || attributes.key.toString(), writable: false, enumerable: true, configurable: false });
    }
  }

  return MemoryRecord;
}();

exports.default = MemoryRecord;


if (process.argv[1] === __filename) {
  var Foo = function (_MemoryRecord) {
    (0, _inherits3.default)(Foo, _MemoryRecord);

    function Foo() {
      (0, _classCallCheck3.default)(this, Foo);
      return (0, _possibleConstructorReturn3.default)(this, (Foo.__proto__ || (0, _getPrototypeOf2.default)(Foo)).apply(this, arguments));
    }

    (0, _createClass3.default)(Foo, null, [{
      key: "define",
      get: function get() {
        return [{ key: "black", name: '☗' }, { key: "white", name: '☖' }, { code: 7 }];
      }
    }]);
    return Foo;
  }(MemoryRecord);

  console.log(Foo.keys);
  console.log(Foo.codes);

  var record = Foo.values[0];
  console.log(record.key);
  console.log(record.code);
  console.log(record.name);

  console.log(Foo.values);
  console.log(Foo.lookup("black").name);
  console.log(Foo.lookup("black").code);

  console.log(Foo.lookup("_key2").name);

  var v = Foo.lookup("black");
  console.log(v instanceof Foo);

  console.log(Foo.lookup(0));
  console.log(Foo.lookup(1));
  console.log(Foo.lookup(2));

  console.log(Foo.values[0] === Foo.values[0]);

  console.log(Foo.values.map(function (e) {
    return e.key;
  }));
  console.log((0, _keys2.default)(Foo.keys_hash));
  console.log(Foo.fetch('unknown'));
}
//# sourceMappingURL=memory_record.js.map