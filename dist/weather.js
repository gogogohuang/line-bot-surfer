'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSeaData = exports.getWeatherById = exports.getAllCity = undefined;

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