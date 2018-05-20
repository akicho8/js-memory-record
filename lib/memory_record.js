"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryRecord = undefined;

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
      console.warn("not implemented");

      return [{ key: "(key_x)" }, { key: "(key_y)" }];
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
    (0, _classCallCheck3.default)(this, MemoryRecord);

    this.attributes = attributes;
  }

  (0, _createClass3.default)(MemoryRecord, [{
    key: "key",
    get: function get() {
      return this.attributes.key;
    }
  }, {
    key: "name",
    get: function get() {
      return this.attributes.name || this.key.toString();
    }
  }, {
    key: "code",
    get: function get() {
      return this.attributes.code;
    }
  }]);
  return MemoryRecord;
}();

exports.MemoryRecord = MemoryRecord;


if (process.argv[1] === __filename) {
  console.log(MemoryRecord.values);
  console.log(MemoryRecord.lookup("(key_x)").name);
  console.log(MemoryRecord.lookup("(key_x)").code);

  var v = MemoryRecord.lookup("(key_x)");
  console.log(v instanceof MemoryRecord);

  console.log(MemoryRecord.lookup(0));
  console.log(MemoryRecord.lookup(1));
  console.log(MemoryRecord.lookup(2));

  console.log(MemoryRecord.values[0] === MemoryRecord.values[0]);

  console.log(MemoryRecord.values.map(function (e) {
    return e.key;
  }));
  console.log((0, _keys2.default)(MemoryRecord.values_map));
  console.log(MemoryRecord.fetch('unknown'));
}
//# sourceMappingURL=memory_record.js.map