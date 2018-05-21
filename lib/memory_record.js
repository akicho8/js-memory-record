"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryRecord = undefined;

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _values = require("babel-runtime/core-js/object/values");

var _values2 = _interopRequireDefault(_values);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _freeze = require("babel-runtime/core-js/object/freeze");

var _freeze2 = _interopRequireDefault(_freeze);

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
    key: "lookup",
    value: function lookup(key) {
      if (key instanceof this) {
        return key;
      }
      if (typeof key === "number") {
        return this.values[key];
      } else {
        return this.values_map[key];
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
    key: "values_map",
    get: function get() {
      var _this = this;

      this._values_map = this._values_map || _lodash2.default.reduce(this.define, function (a, e, i) {
        a[e.key] = (0, _freeze2.default)(new _this((0, _assign2.default)({}, e, { code: i })));
        return a;
      }, {});
      return this._values_map;
    }
  }, {
    key: "keys",
    get: function get() {
      this._keys = this._keys || (0, _keys2.default)(this.values_map);
      return this._keys;
    }
  }, {
    key: "codes",
    get: function get() {
      this._codes = this._codes || this.values.map(function (e) {
        return e.code;
      });
      return this._codes;
    }
  }, {
    key: "values",
    get: function get() {
      this._values = this._values || (0, _values2.default)(this.values_map);
      return this._values;
    }
  }]);

  function MemoryRecord(attributes) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, MemoryRecord);

    Object.defineProperty(this, "attributes", { value: attributes, writable: false, enumerable: false, configurable: false });

    _lodash2.default.forIn(attributes, function (e, k) {
      (0, _defineProperty2.default)(_this2, k, { value: e, writable: false, enumerable: true, configurable: false });
    });

    if (!this.hasOwnProperty("name")) {
      Object.defineProperty(this, "name", { value: attributes.name || this.key.toString(), writable: false, enumerable: true, configurable: false });
    }
  }

  return MemoryRecord;
}();

exports.MemoryRecord = MemoryRecord;


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
        return [{ key: "black", name: '☗' }, { key: "white", name: '☖' }];
      }
    }]);
    return Foo;
  }(MemoryRecord);

  var record = Foo.values[0];
  console.log(record.key);
  console.log(record.code);
  console.log(record.name);

  console.log(Foo.values);
  console.log(Foo.lookup("black").name);
  console.log(Foo.lookup("black").code);

  var v = Foo.lookup("black");
  console.log(v instanceof Foo);

  console.log(Foo.lookup(0));
  console.log(Foo.lookup(1));
  console.log(Foo.lookup(2));

  console.log(Foo.values[0] === Foo.values[0]);

  console.log(Foo.values.map(function (e) {
    return e.key;
  }));
  console.log((0, _keys2.default)(Foo.values_map));
  console.log(Foo.fetch('unknown'));
}
//# sourceMappingURL=memory_record.js.map