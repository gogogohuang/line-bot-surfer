"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPredictionData = exports.weatherNowData = exports.getSeaData = exports.getWeatherById = exports.getAllCity = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.reduce");

require("regenerator-runtime/runtime");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var data = _interopRequireWildcard(require("./common/V"));

var Parser = _interopRequireWildcard(require("./common/Parser"));

var _saxStream = _interopRequireDefault(require("sax-stream"));

var _hyperquest = _interopRequireDefault(require("hyperquest"));

var _axios = _interopRequireDefault(require("axios"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAllCity = function getAllCity() {
  return (0, _nodeFetch["default"])("https://works.ioa.tw/weather/api/all.json", {
    method: "GET",
    mode: "cors"
  }).then(function (res) {
    if (res && res.ok) {
      return res.json();
    } else {
      throw new Error("Server response wasn't OK");
    }
  }).then(function (data) {
    return data;
  })["catch"](function (err) {// console.log(err);
  });
};

exports.getAllCity = getAllCity;

var getWeatherById = function getWeatherById(id) {
  return (0, _nodeFetch["default"])("https://works.ioa.tw/weather/api/weathers/".concat(id, ".json"), {
    method: "GET",
    mode: "cors"
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Server response wasn't OK");
    }
  }).then(function (data) {
    return data;
  })["catch"](function (err) {
    console.log(err);
  });
}; // export const getSeaData = () => {
//   hyperquest(
//     `http://opendata.cwb.gov.tw/opendataapi?dataid=${data.seaData}&authorizationkey=${data.apiKey}`
//   ).pipe(
//     saxStream({
//       strict: true,
//       tag: "location"
//     }).on("data", function(item) {
//       console.log(Parser.oceanDataParser(item));
//       //console.log(item);
//     })
//   );
// };


exports.getWeatherById = getWeatherById;

var getSeaData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios["default"].get("http://opendata.cwb.gov.tw/opendataapi?dataid=".concat(data.seaData, "&authorizationkey=").concat(data.apiKey));

          case 3:
            response = _context.sent;
            console.log(response);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getSeaData() {
    return _ref.apply(this, arguments);
  };
}();

exports.getSeaData = getSeaData;

var weatherNowData = function weatherNowData(weather, location) {
  if (!weather) {
    return "唉唷, 出錯了.";
  }

  var newData = new Array();
  newData.push("\u73FE\u5728\u5929\u6C23\u662F".concat(weather.desc, " "));
  newData.push("\u6C23\u6EAB\u662F".concat(weather.temperature, "\u5EA6 "));
  weather.felt_air_temp < 20 ? newData.push("\u9AD4\u611F\u6EAB\u5EA6\u662F".concat(weather.felt_air_temp, "\u5EA6, \u6709\u9EDE\u6DBC\u610F ")) : newData.push("\u9AD4\u611F\u6EAB\u5EA6\u662F".concat(weather.felt_air_temp, "\u5EA6 "));
  weather.rainfall === 0 ? newData.push("今天不會下雨 ") : newData.push("\u964D\u96E8\u6A5F\u7387: ".concat(weather.rainfall, "% "));
  weather.specials.length !== 0 ? newData.push("\u73FE\u5728\u6709\u4E8B\u4E86, ".concat(weather.specials[0].title, ", ").concat(weather.specials[0].desc, " ")) : newData.push("這裡沒事兒 ");
  var reply = newData.reduce(function (pre, cur) {
    return pre + cur;
  }, "".concat(location, ": "));
  return reply;
};

exports.weatherNowData = weatherNowData;

var getPredictionData = function getPredictionData() {
  (0, _hyperquest["default"])("http://opendata.cwb.gov.tw/opendataapi?dataid=".concat(data.preData, "&authorizationkey=").concat(data.apiKey)).pipe((0, _saxStream["default"])({
    strict: true //tag: 'location'

  }).on("data", function (item) {
    console.log(item); //console.log(item);
  }));
};

exports.getPredictionData = getPredictionData;