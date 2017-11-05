'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPredictionData = exports.weatherNowData = exports.getSeaData = exports.getWeatherById = exports.getAllCity = undefined;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _V = require('./common/V');

var data = _interopRequireWildcard(_V);

var _Parser = require('./common/Parser');

var Parser = _interopRequireWildcard(_Parser);

var _saxStream = require('sax-stream');

var _saxStream2 = _interopRequireDefault(_saxStream);

var _hyperquest = require('hyperquest');

var _hyperquest2 = _interopRequireDefault(_hyperquest);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllCity = exports.getAllCity = function getAllCity() {
    return (0, _nodeFetch2.default)('https://works.ioa.tw/weather/api/all.json', {
        method: 'GET',
        mode: 'cors'
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Server response wasn\'t OK');
        }
    }).then(function (data) {
        return data;
    }).catch(function (err) {
        console.log(err);
    });
};

var getWeatherById = exports.getWeatherById = function getWeatherById(id) {
    return (0, _nodeFetch2.default)('https://works.ioa.tw/weather/api/weathers/' + id + '.json', {
        method: 'GET',
        mode: 'cors'
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Server response wasn\'t OK');
        }
    }).then(function (data) {
        return data;
    }).catch(function (err) {
        console.log(err);
    });
};

var getSeaData = exports.getSeaData = function getSeaData() {
    (0, _hyperquest2.default)('http://opendata.cwb.gov.tw/opendataapi?dataid=' + data.seaData + '&authorizationkey=' + data.apiKey).pipe((0, _saxStream2.default)({
        strict: true,
        tag: 'location'
    }).on('data', function (item) {
        console.log(Parser.oceanDataParser(item));
        //console.log(item);
    }));
};

var weatherNowData = exports.weatherNowData = function weatherNowData(weather, location) {
    if (!weather) {
        return "唉唷, 出錯了.";
    }

    var newData = new Array();
    newData.push('\u73FE\u5728\u5929\u6C23\u662F' + weather.desc + ' ');
    newData.push('\u6C23\u6EAB\u662F' + weather.temperature + '\u5EA6 ');

    weather.felt_air_temp < 20 ? newData.push('\u9AD4\u611F\u6EAB\u5EA6\u662F' + weather.felt_air_temp + '\u5EA6, \u6709\u9EDE\u6DBC\u610F ') : newData.push('\u9AD4\u611F\u6EAB\u5EA6\u662F' + weather.felt_air_temp + '\u5EA6 ');

    weather.rainfall === 0 ? newData.push("今天不會下雨 ") : newData.push('\u964D\u96E8\u6A5F\u7387: ' + weather.rainfall + '% ');

    weather.specials.length !== 0 ? newData.push('\u73FE\u5728\u6709\u4E8B\u4E86, ' + weather.specials[0].title + ', ' + weather.specials[0].desc + ' ') : newData.push("這裡沒事兒 ");

    var reply = newData.reduce(function (pre, cur) {
        return pre + cur;
    }, location + ': ');
    return reply;
};

var getPredictionData = exports.getPredictionData = function getPredictionData() {
    (0, _hyperquest2.default)('http://opendata.cwb.gov.tw/opendataapi?dataid=' + data.preData + '&authorizationkey=' + data.apiKey).pipe((0, _saxStream2.default)({
        strict: true
        //tag: 'location'
    }).on('data', function (item) {
        console.log(item);
        //console.log(item);
    }));
};