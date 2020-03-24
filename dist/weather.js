"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPredictionData = exports.weatherNowData = exports.getSeaData = exports.getWeatherById = exports.getAllCity = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var data = _interopRequireWildcard(require("./common/V"));

var Parser = _interopRequireWildcard(require("./common/Parser"));

var _saxStream = _interopRequireDefault(require("sax-stream"));

var _hyperquest = _interopRequireDefault(require("hyperquest"));

var _axios = _interopRequireDefault(require("axios"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const getAllCity = () => {
  return (0, _nodeFetch.default)(`https://works.ioa.tw/weather/api/all.json`, {
    method: "GET",
    mode: "cors"
  }).then(res => {
    if (res && res.ok) {
      return res.json();
    } else {
      throw new Error("Server response wasn't OK");
    }
  }).then(data => data).catch(err => {// console.log(err);
  });
};

exports.getAllCity = getAllCity;

const getWeatherById = id => {
  return (0, _nodeFetch.default)(`https://works.ioa.tw/weather/api/weathers/${id}.json`, {
    method: "GET",
    mode: "cors"
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Server response wasn't OK");
    }
  }).then(data => {
    return data;
  }).catch(err => {
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

const getSeaData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    try {
      const response = yield _axios.default.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/${data.seaData}?authorizationkey=${data.apiKey}&format=JSON`);
      console.log(response.data.records.location.forEach(loc => {
        console.log(`${loc.locationName}: ${loc.stationId}`);
      }));
    } catch (error) {
      console.error(error);
    }
  });

  return function getSeaData() {
    return _ref.apply(this, arguments);
  };
}();

exports.getSeaData = getSeaData;

const weatherNowData = (weather, location) => {
  if (!weather) {
    return "唉唷, 出錯了.";
  }

  let newData = new Array();
  newData.push(`現在天氣是${weather.desc} `);
  newData.push(`氣溫是${weather.temperature}度 `);
  weather.felt_air_temp < 20 ? newData.push(`體感溫度是${weather.felt_air_temp}度, 有點涼意 `) : newData.push(`體感溫度是${weather.felt_air_temp}度 `);
  weather.rainfall === 0 ? newData.push("今天不會下雨 ") : newData.push(`降雨機率: ${weather.rainfall}% `);
  weather.specials.length !== 0 ? newData.push(`現在有事了, ${weather.specials[0].title}, ${weather.specials[0].desc} `) : newData.push("這裡沒事兒 ");
  const reply = newData.reduce((pre, cur) => {
    return pre + cur;
  }, `${location}: `);
  return reply;
};

exports.weatherNowData = weatherNowData;

const getPredictionData = () => {
  (0, _hyperquest.default)(`http://opendata.cwb.gov.tw/opendataapi?dataid=${data.preData}&authorizationkey=${data.apiKey}`).pipe((0, _saxStream.default)({
    strict: true //tag: 'location'

  }).on("data", function (item) {
    console.log(item); //console.log(item);
  }));
};

exports.getPredictionData = getPredictionData;